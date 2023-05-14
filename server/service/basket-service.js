const BasketItemModel = require("../models/BasketItem");
const BasketModel = require("../models/Basket");
const FillingModel = require("../models/Filling");
const ProductModel = require("../models/Product");
const ApiError = require("../exceptions/api-error");

const tokenService = require("./token-service");

class CartService {
  async getCart(token) {
    const user = tokenService.validateAccessToken(token.substr(7));
    const cart = await BasketModel.findOne({ user: user.id });
    if (!cart) {
      return [];
    }
    let productsArr = [];
    for await (const item of cart.basketItems) {
      const basketPosition = await BasketItemModel.findById(item).select(
        "-__v"
      );
      const filling = await FillingModel.findById(
        basketPosition.filling
      ).select("-__v");
      const product = await ProductModel.findById(
        basketPosition.product
      ).select("-__v");
      productsArr.push({
        _id: basketPosition._id,
        product: product,
        filling: filling,
        count: basketPosition.count,
      });
    }
    return productsArr;
  }

  async addItemCart(token, body) {
    const user = tokenService.validateAccessToken(token.substr(7));
    const basket = await BasketModel.findOne({ user: user.id });
    let productsArr = [];
    let createStatus = true;
    if (!basket) {
      await BasketModel.create({ user: user.id });
    } else {
      for await (const item of basket.basketItems) {
        const basketPosition = await BasketItemModel.findById(item).select(
          "-__v"
        );
        productsArr.push({
          basketPosition,
        });
      }
      productsArr.map((el) => {
        // console.log(el);
        if (
          el.basketPosition.product.toString() === body.product &&
          el.basketPosition.filling.toString() === body.filling
        ) {
          createStatus = false;
        }
      });
    }

    let updateBasket;
    // console.log(body);
    if (createStatus) {
      const basketItem = await BasketItemModel.create({
        product: body.product,
        filling: body.filling,
        count: body.count,
      });
      updateBasket = await BasketModel.update(
        { user: user.id },
        { $push: { basketItems: basketItem._id } }
      );
    } else {
      const res = await BasketItemModel.findOne({
        product: body.product,
        filling: body.filling,
      });
      updateBasket = await BasketItemModel.updateOne(
        {
          product: body.product,
          filling: body.filling,
        },
        { $set: { count: res.count + 1 } }
      );
    }

    return { status: "ok" };
  }

  async patchBasketItem(token, body) {
    const user = tokenService.validateAccessToken(token.substr(7));
    const candidateName = await BasketItemModel.findOne({ _id: body._id });

    if (!candidateName) {
      throw ApiError.BadRequest(`Такой позиции в корзине не существует.`);
    }

    await BasketItemModel.findOneAndUpdate(
      { _id: body._id },
      { $set: { count: body.count } }
    );
    const resUpdate = await BasketItemModel.findOne({ _id: body._id });
    if (resUpdate.count <= 0) {
      await BasketItemModel.find({ _id: body._id }).remove();
      await BasketModel.findOneAndUpdate(
        { user: user.id },
        { $pull: { basketItems: resUpdate._id } }
      );
    }

    return { status: "ok" };
  }
}

module.exports = new CartService();
