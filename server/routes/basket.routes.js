const Router = require("express");
const cartController = require("../controllers/basket-controller");
// const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/", cartController.getCart);

router.post("/addItem", cartController.addItem);

router.patch("/patchItem", cartController.patchItem);

module.exports = router;
