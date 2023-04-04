const filesService = require("../service/files-service");
const fs = require("fs");

class FilesController {
  async downloadImage(req, res, next) {
    try {
      const arr = [];
      req.files.map((el) =>
        arr.push({
          name: el.originalname,
          href: "/uploads/" + el.filename,
        })
      );
      return res.json(arr);
    } catch (e) {
      next(e);
    }
  }
  async deleteImage(req, res, next) {
    try {
      fs.unlink("./uploads/" + req.params.href, (err) => console.log(err));
      await filesService.deleteFile(req.params.name);
      return res.json({ status: "ok" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FilesController();
