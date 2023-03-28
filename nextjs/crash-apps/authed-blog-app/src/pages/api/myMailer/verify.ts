import mailTransportOptions from "@/lib/mailTransportOpts";
import withAuth from "@/middlewares/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // console.log(process.env.EMAIL_PASSWORD, process.env.EMAIL_SERVER)
                // console.log(mailTransportOptions)
                let transporter = nodemailer.createTransport(mailTransportOptions);
                const transporterVerified = await transporter.verify();
                return res.json({ msg: "Nodemailer initialization is successfull", success: transporterVerified });
            } catch (error) {
                console.log(error);
                return res.json({ error: "NodeMailer initialization is failed" });
            }
        default:
            return res.status(404).json({ error: "No such route is found!!" });
    }
}

export default withAuth(handler);