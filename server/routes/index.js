const Router = require("express");
const router = Router();

const authRouter = require("./auth.routes");
const productsRouter = require("./products.routes");
const filesRouter = require("./files.routes");
const categoryRouter = require("./category.routes");
const fillingRouter = require("./filling.routes");
const basketRouter = require("./basket.routes");
const orderRouter = require("./order.routes");

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/files", filesRouter);
router.use("/category", categoryRouter);
router.use("/filling", fillingRouter);
router.use("/basket", basketRouter);
router.use("/order", orderRouter);

module.exports = router;
