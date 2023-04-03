const ProductModel = require("../models/Product");
const FillingModel = require("../models/Filling");

class FileService {
  async deleteFile(href) {
    const find = await ProductModel.findOne({
      images: { $elemMatch: { href: "/uploads/" + href } },
    });
    if (!!find) {
      await ProductModel.updateMany(
        {
          images: { $elemMatch: { href: "/uploads/" + href } },
        },
        {
          $pull: { images: { href: "/uploads/" + href } },
        }
      );
    }
    const findFilling = await FillingModel.findOne({
      images: { $elemMatch: { href: "/uploads/" + href } },
    });
    if (!!findFilling) {
      await FillingModel.updateMany(
        {
          images: { $elemMatch: { href: "/uploads/" + href } },
        },
        {
          $pull: { images: { href: "/uploads/" + href } },
        }
      );
    }
    return;
  }
}
module.exports = new FileService();
