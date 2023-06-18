const Router = require("express");
const cartController = require("../controllers/basket-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/", authMiddleware, cartController.getCart);

router.post("/addItem", authMiddleware, cartController.addItem);

router.patch("/patchItem", authMiddleware, cartController.patchItem);

module.exports = router;
