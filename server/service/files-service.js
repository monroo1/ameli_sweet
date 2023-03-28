const ProductModel = require("../models/Product");

class FileService {
  async deleteFile(id) {
    const find = await ProductModel.findOne({
      images: { $elemMatch: { name: id } },
    });
    const candidate = await ProductModel.updateMany(
      {
        images: { $elemMatch: { name: id } },
      },
      {
        $pull: { images: { name: id } },
      }
    );
    return { candidate, find };
  }
}
module.exports = new FileService();
