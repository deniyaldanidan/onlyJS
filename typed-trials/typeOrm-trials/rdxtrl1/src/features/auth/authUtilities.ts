import { AxiosError } from "axios"
import jwtDecode from "jwt-decode"

export type AuthDataType = {
    isAuth: boolean,
    access_token: string | false,
    username: string | false,
    firstname: string | false,
    lastname: string | false,
    fullname: string | false
}

export type AuthStateType = {
    status: "idle" | "loading" | "completed" | "failed",
    data: AuthDataType,
    error: string | false
}

export type loginInitialLoad = {
    unameOrEmail: string,
    password: string
}

export type registerInitialLoad = {
    uname: string,
    password: string,
    email: string,
    fname: string,
    lname: string,
    location: string,
    bio: string
}

export type decodedAccJwtType = { uname: string, fname: string, lname: string }

export type userAuthParamType = {
    action: "login" | "register" | "refresh"
    initialPayload: loginInitialLoad | registerInitialLoad
}

export const parseAuthError = (error: Error): string => {
    if (error instanceof AxiosError) {
        const res = error?.response;
        const status = res?.status;
        if (status === 400 || status === 409 || status === 404) {
            return res?.data?.error || "login failed";
        }
        if (error.message === "Connection to server failed") {
            return error.message;
        }
    }
    console.log(error)
    return "login failed";
}

export const parseAuthData = (acc_Token: string): AuthDataType => {
    const decoded_data = jwtDecode(acc_Token) as decodedAccJwtType;
    return {
        isAuth: true,
        access_token: acc_Token,
        username: decoded_data.uname,
        firstname: decoded_data.fname,
        lastname: decoded_data.lname,
        fullname: decoded_data.fname + " " + decoded_data.lname
    }
}