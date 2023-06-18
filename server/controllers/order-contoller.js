const orderService = require("../service/order-service");
const paymentService = require("../service/payment-service");
const OrderModel = require("../models/Order");

class OrderController {
  async getOrdersUser(req, res, next) {
    try {
      const result = await orderService.getOrdersUser(req.user);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getOrderUser(req, res, next) {
    try {
      const result = await orderService.getOrderUser(req.params.id, req.user);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getAdmin(req, res, next) {
    try {
      const result = await orderService.getOrders();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async createOrder(req, res, next) {
    try {
      const result = await orderService.createOrder(req.user);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchOrder(req, res, next) {
    try {
      const result = await orderService.patchOrder(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchOrderStatus(req, res, next) {
    try {
      const result = await orderService.patchOrderStatus(
        req.params.id,
        req.body.newStatus
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const result = await orderService.deleteOrder(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async paymentOrder(req, res, next) {
    try {
      const order = await OrderModel.findById(req.params.id);
      const result = await paymentService.createPayment(
        !order.payments ? order.cost / 2 : order.cost,
        "Заказ " + order.date
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async checkPaymentOrder(req, res, next) {
    try {
      const result = await paymentService.checkPaymentOrder(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new OrderController();
