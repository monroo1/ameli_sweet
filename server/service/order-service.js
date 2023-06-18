const OrderModel = require("../models/Order");
const basketService = require("./basket-service");
const ApiError = require("../exceptions/api-error");
const mailService = require("./mail-service");
require("dayjs/locale/ru");

class OrderService {
  async getOrdersUser(user) {
    const orders = await OrderModel.find({ user: user.id });
    return orders;
  }

  async getOrderUser(id, user) {
    const order = await OrderModel.findById(id).select("-__v");
    if (!!user.id && order.user.equals(user.id)) {
      return order;
    } else if (!!user && !order.user.equals(user.id) && user.role === "admin") {
      return order;
    } else {
      throw ApiError.BadRequest("Несуществующий заказ.");
    }
  }

  async getOrders() {
    const orders = await OrderModel.find({ status: { $gt: 0, $lt: 5 } }).select(
      "-__v"
    );
    return orders;
  }

  async createOrder(user) {
    const basketItems = await basketService.getCart(user);
    let totalPrice = 0;
    basketItems.map((el) =>
      el.product.promoPrice > 0
        ? (totalPrice += el.product.promoPrice * el.count)
        : (totalPrice += el.product.price * el.count)
    );

    let date = new Date();

    const result = await OrderModel.create({
      user: user.id,
      items: basketItems,
      conut: basketItems.length,
      cost: totalPrice,
      status: 0,
      communication: 0,
      phoneNumber: "+" + user.phone,
      date: date,
    });
    for await (const item of basketItems) {
      await basketService.patchBasketItem(user, {
        _id: item._id,
        count: 0,
      });
    }

    return result;
  }

  async patchOrder(body) {
    //items, cost остаются неизменны после создания заказа
    let result;
    if (!!body.paymentId) {
      result = await OrderModel.findOneAndUpdate(
        { _id: body._id },
        {
          $set: {
            payments: body.payments,
            date: body.date,
            status: body.status,
            delivery: body.delivery,
            communication: body.communication,
            phoneNumber: body.phoneNumber,
            paymentId: body.paymentId,
          },
        }
      );
    } else {
      result = await OrderModel.findOneAndUpdate(
        { _id: body._id },
        {
          $set: {
            payments: body.payments,
            date: body.date,
            status: body.status,
            delivery: body.delivery,
            communication: body.communication,
            phoneNumber: body.phoneNumber,
          },
        }
      );
    }

    if (body.status === 1) {
      await mailService.sendNotificationNewOrderMail(
        body.date,
        process.env.SITE_URL + "/admin/orders"
      );
    }
    return result;
  }

  async patchOrderStatus(id, newStatus) {
    await OrderModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    const order = await OrderModel.findById(id);
    console.log(order);
    return order;
  }

  async deleteOrder(id) {
    const order = await OrderModel.findById(id);
    if (order.status !== 0) {
      throw ApiError.BadRequest("Нельзя удалить заказ.");
    }
    const res = await OrderModel.findOneAndDelete({ _id: id });
    return res;
  }
}
module.exports = new OrderService();
