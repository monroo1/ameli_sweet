const BasketItemModel = require("../models/BasketItem");
const BasketModel = require("../models/Basket");
const FillingModel = require("../models/Filling");
const ProductModel = require("../models/Product");
const ApiError = require("../exceptions/api-error");

class CartService {
  async getCart(userId) {
    const cart = await BasketModel.findOne({ user: userId });
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
      console.log(filling);
      console.log(product);
      productsArr.push({
        _id: basketPosition._id,
        product: product,
        filling: filling,
        count: basketPosition.count,
      });
    }
    return productsArr;
  }

  async addItemCart(userId, body) {
    const basket = await BasketModel.findOne({ user: userId });
    let productsArr = [];
    let createStatus = true;
    if (!basket) {
      await BasketModel.create({ user: userId });
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
        console.log(el);
        if (
          el.basketPosition.product.toString() === body.product &&
          el.basketPosition.filling.toString() === body.filling
        ) {
          createStatus = false;
        }
      });
    }

    let updateBasket;
    if (createStatus) {
      const basketItem = await BasketItemModel.create({
        product: body.product,
        filling: body.filling,
        count: body.count,
      });
      updateBasket = await BasketModel.update(
        { user: userId },
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

  async patchBasketItem(userId, body) {
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
        { user: userId },
        { $pull: { basketItems: resUpdate._id } }
      );
    }

    return { status: "ok" };
  }
}

module.exports = new CartService();
