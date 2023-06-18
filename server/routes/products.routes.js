const Router = require("express");
const productsController = require("../controllers/products-contoller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.get("/", productsController.getProducts);

router.get("/:id", productsController.getProduct);

router.post(
  "/create",
  body("name").isLength({ min: 5 }),
  body("price").isLength({ min: 2 }),
  body("description").isLength({ min: 10 }),
  body("isStock").isBoolean(),
  authMiddleware,
  adminMiddleware,
  productsController.createProduct
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  productsController.deleteProduct
);

router.patch(
  "/patch/:id",
  authMiddleware,
  adminMiddleware,
  productsController.patchProduct
);

module.exports = router;
