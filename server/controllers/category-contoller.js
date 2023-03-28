const categoryService = require("../service/category-service");

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const result = await categoryService.getCategories();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async createCategory(req, res, next) {
    try {
      const result = await categoryService.createCategory(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();
