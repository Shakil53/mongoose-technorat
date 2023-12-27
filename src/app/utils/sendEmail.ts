import nodemailer from 'nodemailer'
import config from '../config';


export const sendEmail = async (to: string, html: string) => {
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "m.shakil5352@gmail.com",
          pass: "tgov dvri kypz ycug",
        },
    });
    


    await transporter.sendMail({
        from: 'm.shakil5352@gmail.com', // sender address
        to, // list of receivers
        subject: "Please set your password", // Subject line
        text: "Rest your password within 10 min", // plain text body
        html, // html body
      });
}