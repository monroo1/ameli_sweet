const cartService = require("../service/basket-service");

class CartController {
  async getCart(req, res, next) {
    try {
      const result = await cartService.getCart(req.user);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async addItem(req, res, next) {
    try {
      const result = await cartService.addItemCart(req.user, req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchItem(req, res, next) {
    try {
      const result = await cartService.patchBasketItem(req.user, req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
