const nodemailer = require("nodemailer");
//AmeliCake

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    });
  }

  async sendActivationMail(name, to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMPT_USER,
        to,
        subject: "Активация аккаунта на " + process.env.API_URL,
  
        html: `
          <div>
            <h1>Привет ${name}!</h1>
            <p>Для активации перейдите по ссылке.</p>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } catch(e) {
      throw ApiError.BadRequest(
        `Ошибка при отправки письма на почту`
      );
    }
  }
}

module.exports = new MailService();
