const productsService = require("../service/products-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await productsService.getAllProduct(req);
      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req, res, next) {
    try {
      const idProduct = req.params.id;
      const product = await productsService.getProduct(idProduct);
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async createProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const result = await productsService.createProduct(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const result = await productsService.deleteProduct(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchProduct(req, res, next) {
    try {
      const result = await productsService.patchProduct(
        req.params.id,
        req.body
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductsController();
