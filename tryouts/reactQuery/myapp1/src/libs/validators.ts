import validator from 'validator';
import { object, string, refine, pattern, assert, StructError, optional } from 'superstruct';

const userReg = /^[a-zA-Z0-9_]{2,40}$/g;
const nameReg = /^[a-z]{2,50}$/gi;
const countryReg = /^[a-z0-9 ]{0,80}$/gi;

export const registerInpValidator = object({
    username: pattern(string(), userReg),
    firstname: pattern(string(), nameReg),
    lastname: pattern(string(), nameReg),
    password: refine(string(), "password", (v, c) => {
        if(v!==c.branch[0]?.confirm){
            return "Password and ReType-Password fields should be same"
        }
        if (validator.isStrongPassword(v)){
            return true
        }
        return "Password is too weak. Provide a stronger one..";
    }),
    country: optional(pattern(string(), countryReg)),
    confirm: string()
})