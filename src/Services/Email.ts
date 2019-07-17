"use strict";
import nodemailer from "nodemailer";

export interface IEmail {
  host: string;
  port: number;
  auth: {
    user: string,
    pass: string,
  };
  sendMail(from: string, to: string, subject: string, html: string, text: string): void;
}

export default class Email implements IEmail {
  public host: string;
  public port: number;
  public auth: { user: string; pass: string; };
  constructor(host: string, port: number, auth: {
    user: string,
    pass: string,
  }) {
    this.host = host;
    this.port = port;
    this.auth = auth;
  }
  public async sendMail(from: string, to: string, subject: string, html: string, text: string): Promise<void> {
    const transporter = await nodemailer.createTransport({ host: this.host, port: this.port, auth: this.auth });
    // verify connection configuration
    await transporter.verify();
    const sendEmail = transporter.sendMail({
      from,
      html,
      subject,
      text,
      to,
    });
    return transporter.close();
  }
}
