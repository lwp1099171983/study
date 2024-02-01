import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('application.email.host'),
      port: configService.get('application.email.port'),
      secure: false,
      auth: {
        user: configService.get('application.email.user'),
        pass: configService.get('application.email.pass'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: '1099171983@qq.com',
      },
      to,
      subject,
      html,
    });
  }
}
