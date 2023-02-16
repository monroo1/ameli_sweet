const filesService = require("../service/files-service");
// const { validationResult } = require("express-validator");
// const ApiError = require("../exceptions/api-error");

class FilesController {
  async downloadImage(req, res, next) {
    try {
      console.log(req.body);
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
