const fillingService = require("../service/filling-service");

class FillingController {
  async getFillings(req, res, next) {
    try {
      const result = await fillingService.getFillings();
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getFilling(req, res, next) {
    try {
      const result = await fillingService.getFilling(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async createFilling(req, res, next) {
    try {
      const result = await fillingService.createFilling(req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteFilling(req, res, next) {
    try {
      const result = await fillingService.deleteFilling(req.params.id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async patchFilling(req, res, next) {
    try {
      const result = await fillingService.patchFilling(req.params.id, req.body);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FillingController();
