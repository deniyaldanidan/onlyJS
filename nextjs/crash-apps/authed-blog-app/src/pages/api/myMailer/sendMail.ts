import mailTransportOptions from "@/lib/mailTransportOpts";
import withAuth from "@/middlewares/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";



const handler = async (req:NextApiRequest, res:NextApiResponse)=>{
    const {method} = req;

    switch (method){
        case 'POST':
            try {
                
                let transporter = nodemailer.createTransport(mailTransportOptions);
                const {email, subject} = JSON.parse(req.body);
                const message:Mail.Options = {
                    from: process.env.EMAIL_FROM,
                    to: [email, "deniyaldanidan@gmail.com", "jackdanielj2@gmail.com", "senorfavorita@gmail.com"],
                    subject: subject,
                    text: subject,
                    html: `<p>${subject}</p>`
                }
                const myMail = await transporter.sendMail(message);
                console.log(myMail)
                return res.json({msg: "Message is sent", email, subject});
            } catch (error) {
                console.log(error);
            }
        default:
            return res.status(404).json({error: "No such route is found!!"});
    }
}

export default withAuth(handler);