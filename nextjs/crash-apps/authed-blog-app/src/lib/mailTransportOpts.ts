import SMTPTransport from "nodemailer/lib/smtp-transport";

const mailTransportOptions:SMTPTransport.Options = {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT || "465"),
    auth: {
        user: process.env.EMAIL_USER,
        pass: String(process.env.EMAIL_PASSWORD)
    },
    secure: true,
    from: process.env.EMAIL_FROM
}

export default mailTransportOptions;