const ApiError = require("../exceptions/api-error");

module.exports = function (req, res, next) {
  try {
    const isAdmin = req.user.role;
    if (isAdmin !== "admin") {
      return next(ApiError.InsufficientAccountPermissions());
    }
    next();
  } catch (e) {
    return next(ApiError.InsufficientAccountPermissions());
  }
};
