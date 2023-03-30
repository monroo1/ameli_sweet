const FillingModel = require("../models/Filling");
const ApiError = require("../exceptions/api-error");

class FillingService {
  async createFilling(body) {
    const candidateName = await FillingModel.findOne({ name: body.name });
    if (candidateName) {
      throw ApiError.BadRequest(
        `Начинка с таким названием (${body.name}) уже существует `
      );
    }
    const product = await FillingModel.create(body);
    return product;
  }

  async getFillings() {
    const products = await FillingModel.find();
    return products;
  }

  async getFilling(id) {
    const product = await FillingModel.findOne({ _id: id });
    return product;
  }

  async deleteFilling(id) {
    const candidateName = await FillingModel.findOne({ _id: id });
    if (!candidateName) {
      throw ApiError.BadRequest(`Такой начинки ( id: ${id} ) не существует.`);
    }

    const result = await FillingModel.find({ _id: id }).remove().exec();
    return result;
  }

  async patchFilling(id, body) {
    await FillingModel.findOne({ _id: id }).update(body);
    const result = await FillingModel.findOne({ _id: id });
    return result;
  }
}

module.exports = new FillingService();
