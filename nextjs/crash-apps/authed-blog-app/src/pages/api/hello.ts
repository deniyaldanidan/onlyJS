import withAuth from '@/middlewares/withAuth';
import withRoles from '@/middlewares/withRoles';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  name?: string,
  error?: string
}

const handler = async ( req: NextApiRequest, res: NextApiResponse<Data>, currUser:any)=>{
  const { method } = req;
  switch (method) {
    case 'GET':
      return res.status(200).json({ name: currUser.name });
    default:
      return res.status(404).json({ error: "Unknown method" });
  }

}

export default withAuth(handler);