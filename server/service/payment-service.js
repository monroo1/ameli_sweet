const { v4: uuidv4 } = require("uuid");
const ApiError = require("../exceptions/api-error");
const axios = require("axios");
const orderService = require("./order-service");
const OrderModel = require("../models/Order");

class PaymentService {
  async createPayment(price, description) {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.yookassa.ru/v3/payments",
        headers: {
          "Content-Type": "application/json",
          "Idempotence-Key": uuidv4(),
        },
        auth: {
          username: process.env.SHOP_ID,
          password: process.env.YOOKASSA_SECRET,
        },
        data: {
          amount: {
            value: price,
            currency: "RUB",
          },
          capture: true,
          confirmation: {
            type: "redirect",
            return_url: process.env.SITE_URL + "/profile",
          },
          description: description,
        },
      });
      return data;
    } catch (e) {
      throw ApiError.BadRequest(`Ошибка при создании платежа`);
    }
  }

  async checkPaymentOrder(payment_id) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://api.yookassa.ru/v3/payments/${payment_id}`,
        auth: {
          username: process.env.SHOP_ID,
          password: process.env.YOOKASSA_SECRET,
        },
      });
      if (!!data) {
        const order = await OrderModel.findOne({
          paymentId: payment_id,
        }).exec();
        if (order.status === 3 && data.status === "succeeded") {
          return;
        } else if (data.status === "succeeded" && order.status === 2) {
          await orderService.patchOrder({
            _id: order._id,
            payments: order.payments,
            date: order.date,
            status: order.status,
            delivery: order.delivery,
            communication: order.communication,
            phoneNumber: order.phoneNumber,
            paymentId: order.paymentId,
            status: 3,
          });
        } else {
          return;
        }
      }

      return data;
    } catch (e) {
      throw ApiError.BadRequest(`Ошибка при проверке платежа`);
    }
  }
}

module.exports = new PaymentService();
