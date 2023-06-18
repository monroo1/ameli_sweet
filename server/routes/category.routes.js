const Router = require("express");
const categoryController = require("../controllers/category-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = new Router();

router.get("/", categoryController.getCategories);

router.post(
  "/create",
  authMiddleware,
  adminMiddleware,
  categoryController.createCategory
);

router.delete(
  "/delete/:name",
  authMiddleware,
  adminMiddleware,
  categoryController.deleteCategory
);

router.patch(
  "/patch/:name",
  authMiddleware,
  adminMiddleware,
  categoryController.patchCategory
);

module.exports = router;
