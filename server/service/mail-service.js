const nodemailer = require("nodemailer");
const ApiError = require("../exceptions/api-error");
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
    console.log("da1");
    try {
      console.log("da2");
      await this.transporter.sendMail({
        from: process.env.SMPT_USER,
        to,
        subject: "Активация аккаунта на " + process.env.API_URL,

        html: `
          <div>
            <h1>Привет, ${name}!</h1>
            <p>Для активации аккаунта перейдите по ссылке.</p>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } catch (e) {
      console.log("da3");
      throw ApiError.BadRequest(`Ошибка при отправки письма на почту`);
    }
  }
}

module.exports = new MailService();
