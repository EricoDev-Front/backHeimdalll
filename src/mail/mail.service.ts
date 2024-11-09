import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "heimdall.ifsp@gmail.com",
                pass: "kjld lzkn ddle hjls", // Utilize a senha de aplicativo do Gmail
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: "heimdall.ifsp@gmail.com",
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email enviado para: ${to}`);
        } catch (error) {
            console.log(`Erro ao enviar e-mail: ${error.message}`);
        }
    }
}
