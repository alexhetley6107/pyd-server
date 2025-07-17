import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from: `PYD Support <${process.env.NODE_MAILER_USER}>`,
      to,
      subject,
      html,
    });
  }

  async sendResetPassword(to: string, token: string): Promise<void> {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const html = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    await this.sendMail(to, 'Reset Your Password', html);
  }
}
