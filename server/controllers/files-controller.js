const filesService = require("../service/files-service");
// const { validationResult } = require("express-validator");
// const ApiError = require("../exceptions/api-error");

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
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FilesController();
