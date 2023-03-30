const Router = require("express");
const categoryController = require("../controllers/category-contoller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/", categoryController.getCategories);

router.post("/create", authMiddleware, categoryController.createCategory);

router.delete(
  "/delete/:name",
  authMiddleware,
  categoryController.deleteCategory
);

router.patch("/patch/:name", authMiddleware, categoryController.patchCategory);

module.exports = router;
