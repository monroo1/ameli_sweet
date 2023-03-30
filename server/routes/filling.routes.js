const Router = require("express");
const fillingController = require("../controllers/filling-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/", fillingController.getFillings);

router.get("/:id", fillingController.getFilling);

router.post(
  "/create",
  //  authMiddleware,
  fillingController.createFilling
);

router.delete(
  "/delete/:id",
  //   authMiddleware,
  fillingController.deleteFilling
);

router.patch(
  "/patch/:id",
  //  authMiddleware,
  fillingController.patchFilling
);

module.exports = router;
