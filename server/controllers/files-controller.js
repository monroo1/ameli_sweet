const filesService = require("../service/files-service");
const fs = require("fs");

class FilesController {
  async downloadImage(req, res, next) {
    try {
      const arr = [];
      req.files.map((el) =>
        arr.push({ name: el.originalname, href: "/uploads/" + el.filename })
      );
      return res.json(arr);
    } catch (e) {
      next(e);
    }
  }
  async deleteImage(req, res, next) {
    try {
      const result = await filesService.deleteFile(req.params.id);
      const href = result.find.images.filter((el) => el.name === req.params.id);
      fs.unlink("." + href[0].href, (err) => console.log(err));
      return res.json(result.candidate);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FilesController();
