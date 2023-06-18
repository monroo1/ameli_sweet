const Router = require("express");
const orderController = require("../controllers/order-contoller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = new Router();

router.get("/", authMiddleware, orderController.getOrdersUser);

router.get("/:id", authMiddleware, orderController.getOrderUser);

router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  orderController.getAdmin
);

router.post("/create", authMiddleware, orderController.createOrder);

router.patch("/patch", authMiddleware, orderController.patchOrder);

router.patch(
  "/changeStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderController.patchOrderStatus
);

router.delete("/delete/:id", authMiddleware, orderController.deleteOrder);

router.post("/payment/:id", authMiddleware, orderController.paymentOrder);

router.get("/payment/:id", orderController.checkPaymentOrder);

module.exports = router;
