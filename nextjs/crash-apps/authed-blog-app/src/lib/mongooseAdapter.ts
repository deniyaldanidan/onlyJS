import { ObjectId } from "mongodb";
import type {
    Adapter,
    AdapterAccount,
    AdapterSession,
    AdapterUser,
    VerificationToken,
} from "next-auth/adapters";
// import type { Account } from "next-auth";
import { dbConnT } from "./dbConnect";
import UserModel from "@/models/User";
import AccountModel from "@/models/Account";
import SessionModel from "@/models/Session";
import VerificationTokenModel from "@/models/VerificationToken";

export const format = {
    /** Takes a mongoDB object and returns a plain old JavaScript object */
    from<T = Record<string, unknown>>(object: Record<string, any>): T {
        const newObject: Record<string, unknown> = {}
        for (const key in object) {
            const value = object[key]
            if (key === "_id") {
                newObject.id = value.toHexString()
            } else if (key === "userId") {
                newObject[key] = value.toHexString()
            } else if (key !== "__v") {
                newObject[key] = value
            }
        }
        return newObject as T
    },
}

/** Converts from string to ObjectId */
export function _id(hex?: string) {
    if (hex?.length !== 24) return new ObjectId()
    return new ObjectId(hex)
}

export function MongooseAdapter(dbConnect: dbConnT): Adapter {
    const { from } = format;

    return {
        async createUser(data) {
            await dbConnect();
            const user = await UserModel.create(data)
            return from<AdapterUser>(user)
        },
        async getUser(id) {
            try {
                await dbConnect();
                const user = await UserModel.findById(id).lean()
                if (!user) return null
                return from<AdapterUser>(user)
            } catch (err) {
                return null
            }
        },
        async getUserByEmail(email) {
            await dbConnect();
            const user = await UserModel.findOne({ email: email }).lean()
            if (!user) return null
            return from<AdapterUser>(user)
        },
        async getUserByAccount(data) {
            await dbConnect();
            const account = await AccountModel.findOne(data)
            if (!account) return null
            const user = await UserModel.findById(account.userId).lean()
            if (!user) return null
            return from<AdapterUser>(user)
        },
        async updateUser(data) {
            await dbConnect();
            const user = await UserModel.findByIdAndUpdate(
                data.id,
                { name: data.name },
                { new: true }
            ).exec()
            return from<AdapterUser>(user as any)
        },
        async deleteUser(id) {
            await dbConnect();
            await Promise.all([
                AccountModel.deleteMany({ userId: id }),
                SessionModel.deleteMany({ userId: id }),
                UserModel.findByIdAndDelete(id),
            ])
        },
        async linkAccount(data) {
            await dbConnect();
            const account = await AccountModel.create(data)
            return from<AdapterAccount>(account)
        },
        async unlinkAccount(data) {
            await dbConnect();
            const account = await AccountModel.findOneAndDelete(data)
            return from<AdapterAccount>(account as any)
        },
        async getSessionAndUser(sessionToken) {
            await dbConnect();
            const session = await SessionModel.findOne({
                sessionToken: sessionToken,
            }).lean()
            if (!session) return null
            const user = await UserModel.findById(session.userId).lean()
            if (!user) return null
            return {
                user: from<AdapterUser>(user),
                session: from<AdapterSession>(session),
            }
        },
        async createSession(data) {
            await dbConnect();
            const session = await SessionModel.create(data)
            return from<AdapterSession>(session)
        },
        async updateSession(data) {
            await dbConnect();
            const session = await SessionModel.findOneAndUpdate({
                sessionToken: data.sessionToken,
                expires: data.expires,
            })
            return from<AdapterSession>(session as any)
        },
        async deleteSession(sessionToken) {
            await dbConnect();
            const session = await SessionModel.findOneAndDelete({
                sessionToken: sessionToken,
            })
            return from<AdapterSession>(session as any)
        },
        async createVerificationToken(data) {
            await dbConnect();
            const verificationToken = await VerificationTokenModel.create(data)
            return from<VerificationToken>(verificationToken)
        },
        async useVerificationToken(data) {
            await dbConnect();
            const verificationToken = await VerificationTokenModel.findOneAndDelete(
                data
            ).lean()
            if (!verificationToken) return null
            const { expires, token, identifier } = verificationToken
            return {expires, token, identifier} as VerificationToken;
        },
    }
}