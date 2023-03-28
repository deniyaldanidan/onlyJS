import { roles_list } from "@/components/AuthWrapper";
import { NextApiRequest, NextApiResponse } from "next";


/**
 * @warning This function should be wrapped by a withAuth-middleware
 */

const withRoles = (handler:any, ...roles:roles_list)=>{
    return (req:NextApiRequest, res:NextApiResponse, currUser:any)=>{
        console.log(currUser);
        console.log(roles);
        if (currUser?.roles?.find((role:any)=>roles.includes(role))){
            return handler(req, res, currUser)
        }
        return res.status(403).json({error: "You are not authorized to access this data"});
    }
}


export default withRoles