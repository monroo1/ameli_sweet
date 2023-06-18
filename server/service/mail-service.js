const nodemailer = require("nodemailer");
const ApiError = require("../exceptions/api-error");
//AmeliCake

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      secure: false,
      dkim: {
        domainName: "https://ameli-cake.ru",
        keySelector: "2023",
        privateKey: `-----BEGIN RSA PRIVATE KEY-----\n
        MIICXQIBAAKBgQC83rbHHysxaApt3Q6wD1Qn2dbE8FNRaPbSuTnK3EBVE41NvnFf
        fRhofWUutMmoY+pIbjWPQ7uvtrEh1sf5jJJIqOCFQso2QeZDo97vhN4zb1SXoKTU
        hZq1TNMoyviOKe/kgMZ7oM857GQo/SubvB6zMb2k1yKYah0Oc/3yMiOk2QIDAQAB
        AoGBALBWL8iRbT5fqP0SGxh991CNrluJFgE4QtpTXYXtRZMpAhDH8gn5PcSw7rtA
        x9aUErU1UIRF9QIFTDQP1/1CJYBa+Qsm6LSDZh5wgU9v1c4L8H4fFcjSbzIi93xo
        e2d1EWARTYtFBa0Ei9QVUWvcAjsGKvIeuyVQkHLCCfouCEdBAkEA+5FaRS5E4WRo
        O87lN2FUya1EdOKzT2AgzNEKsu84/39sM5o+ZmP+B6VqVvr/0BBPZfRNe4eXtogn
        ReiH7FFgXQJBAMAykzwu3VPguMlySyFm2tuMI1wj9viTbOl3pvjb/zpeLGmQ3b4W
        nJj7FvCbAdnSnYf7x77BwvMNIeCHdyAbPq0CQEcxnH1lmcK7uq/qXn4swmUM7wmx
        OpOlHcM5CbEX+GZ+Ni3oYe5yL+sUCiMxh4Hni8DLwb3K4smagJrNMuJTKVUCQFiK
        M/fCoyVT3ey3YVMG3gXL/jIhQ1HqIH9BJsN4HZDW92C+YtiB9CwpZ7z5u5WMCBQv
        8im3e0aaoyObZE5/HpUCQQCBKxXJc+JY03phhepsXTDnqrPe01VHMqNdzdcn9tyP
        66/MwhZc354PREjZzSp8J5ttMTlTUSl79rDOihjaLHhU
        \n-----END RSA PRIVATE KEY-----`,
      },
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
            <h1>Привет, ${name}!</h1>
            <p>Для активации аккаунта перейдите по ссылке.</p>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } catch (e) {
      throw ApiError.BadRequest(`Ошибка при отправки письма на почту`);
    }
  }
  async sendNotificationNewOrderMail(date, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMPT_USER,
        to: process.env.MAIL_ADMIN,
        subject: "Совершен новый заказ " + process.env.API_URL,
        html: `
          <div>
            <h1>Размещен новый заказ!</h1>
            <p>Пользователь совершил заказ в интернет магазине на ${date}.</p>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
    } catch (e) {
      throw ApiError.BadRequest(`Ошибка при отправки письма на почту`);
    }
  }
}

module.exports = new MailService();
