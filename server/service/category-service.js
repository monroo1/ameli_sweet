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

  async deleteCategory(name) {
    const candidateName = await CategoryModel.findOne({ name: name });

    if (!candidateName) {
      throw ApiError.BadRequest(`Такой категории ( ${name} ) не существует.`);
    }

    const result = await CategoryModel.find({ name: name }).remove().exec();
    return result;
  }

  async patchCategory(name, newName) {
    const candidateName = await CategoryModel.findOne({ name: name });

    if (!candidateName) {
      throw ApiError.BadRequest(`Такой категории ( ${name} ) не существует.`);
    }

    await CategoryModel.findOneAndUpdate(
      { name: name },
      { $set: { name: newName } }
    );

    return { name: newName, status: "ok" };
  }
}

module.exports = new CategoryService();
