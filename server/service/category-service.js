const CategoryModel = require("../models/Category");
const ApiError = require("../exceptions/api-error");

class CategoryService {
  async createCategory(body) {
    const candidateName = await CategoryModel.findOne({ name: body.name });
    if (candidateName) {
      throw ApiError.BadRequest(
        `Такая категория ( ${candidateName.name} ) уже существует.`
      );
    }
    const category = await CategoryModel.create(body);
    return category;
  }

  async getCategories() {
    const categories = await CategoryModel.find();
    return categories;
  }

  async deleteCategory(id) {
    const candidateName = await CategoryModel.findOne({ name: id });

    if (!candidateName) {
      throw ApiError.BadRequest(`Такой категории ( ${id} ) не существует.`);
    }

    const result = await CategoryModel.find({ name: id }).remove().exec();
    return result;
  }
}

module.exports = new CategoryService();
