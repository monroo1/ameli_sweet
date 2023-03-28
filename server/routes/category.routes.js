const Router = require("express");
const categoryController = require("../controllers/category-contoller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/", authMiddleware, categoryController.getCategories);

router.post("/create", authMiddleware, categoryController.createCategory);

router.delete("/delete/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;
