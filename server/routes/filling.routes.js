const Router = require("express");
const fillingController = require("../controllers/filling-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = new Router();

router.get("/", fillingController.getFillings);

router.get("/:id", fillingController.getFilling);

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  fillingController.createFilling
);

router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  fillingController.deleteFilling
);

router.patch(
  "/patch/:id",
  authMiddleware,
  adminMiddleware,
  fillingController.patchFilling
);

module.exports = router;
