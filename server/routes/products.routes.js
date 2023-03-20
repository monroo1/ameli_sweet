const Router = require("express");
const productsController = require("../controllers/products-contoller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/get", productsController.getProducts);

router.get("/get/:id", productsController.getProduct);

router.post(
  "/create",
  body("name").isLength({ min: 5 }),
  body("price").isLength({ min: 2 }),
  body("description").isLength({ min: 10 }),
  body("isStock").isBoolean(),
  authMiddleware,
  productsController.createProduct
);

router.delete(
  "/delete/:id",
  authMiddleware
  // productsController.
);

router.patch(
  "/patch/:id",
  authMiddleware
  // productsController.
);

module.exports = router;
