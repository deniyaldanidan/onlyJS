import withAuth from "@/middlewares/withAuth";
import withRoles from "@/middlewares/withRoles";
import { NextApiRequest, NextApiResponse } from "next";



type Data = {
    message?: string,
    error?:string
}

const handler = async (req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const {method} = req;

    switch (method){
        case 'GET':
            return res.status(200).json({message: "This is admin page"});
        default:
            return res.status(404).json({error: "Unknown Request"});
    }
}

export default withAuth(withRoles(handler, "admin"));