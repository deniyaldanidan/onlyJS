import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

export type roles_list = Array<"user" | "admin" | "editor">;

export default function AuthWrapper({children, authInfo}:{children:JSX.Element, authInfo: {allowedRoles: roles_list}}):any{
    const {data:sessionData, status} = useSession({required: true});
    const router = useRouter()

    if (status==="loading"){
        return <div className="infor-page">Loading...</div>
    }

    if (status==="authenticated" && (sessionData.user as {roles:roles_list})?.roles.find(role=>authInfo.allowedRoles.includes(role))){
        return children
    } else{
        router.replace("/unauthorized");
    }


}