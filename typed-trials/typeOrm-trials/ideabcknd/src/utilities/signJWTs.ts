import jwt from 'jsonwebtoken';

type signrefreshTypeInps = {
    username: string
}

type signAccTypeInps = signrefreshTypeInps & {
    firstname: string,
    lastname: string
}

/**
 * 
 * @param payloadObj - payload object has three properties namely:
 * 
 * {
 *  username: string,
 *  firstname: string,
 *  lastname: string
 * } 
 * @returns This function will return jwt-access-token with http-only=true and expiresIn= 5 minutes
 * 
 */

export const signAccessTkn:(signAccTypeInps:signAccTypeInps)=>string = ({username, firstname, lastname})=>jwt.sign({ uname: username, fname: firstname, lname: lastname }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" })

/**
 * 
 * @param payloadObj - payload object has only one property namely:
 * 
 * {
 *  username: string
 * }
 * @returns This function will return jwt-access-token with http-only=true and expiresIn= 10 minutes
 */

export const signRefreshTkn:(signrefreshTypeInps:signrefreshTypeInps)=>string = ({username})=>jwt.sign({uname:username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "10m"})
