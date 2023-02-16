const ProductModel = require("../models/Product");
const ApiError = require("../exceptions/api-error");

class ProductsService {
  async createProduct(body) {
    const candidateName = await ProductModel.findOne({ name: body.name });
    if (candidateName) {
      throw ApiError.BadRequest(
        `Товар с таким названием (${body.name}) уже существует `
      );
    }
    const product = await ProductModel.create(body);
    return product;
  }

  async getAllProduct() {
    const products = await ProductModel.find();
    return products;
  }

  async getProduct(id) {
    const product = await ProductModel.findOne({ _id: id });
    return product;
  }
}

module.exports = new ProductsService();
