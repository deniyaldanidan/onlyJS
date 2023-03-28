import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from 'next-auth';



const withAuth = (handler:any)=>{
    return async (req:NextApiRequest, res:NextApiResponse)=>{
        const session = await getServerSession(req, res, authOptions);
      if (!session){
        return res.status(401).json({error: "Sign-in first to access this API"});
      }
      return handler(req, res, session.user)
    }
}

export default withAuth;