const cartService = require("../service/basket-service");

class CartController {
  async getCart(req, res, next) {
    try {
      const result = await cartService.getCart(req.header("authorization"));
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async addItem(req, res, next) {
    try {
      const result = await cartService.addItemCart(
        req.header("authorization"),
        req.body
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchItem(req, res, next) {
    try {
      const result = await cartService.patchBasketItem(
        req.header("authorization"),
        req.body
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CartController();
