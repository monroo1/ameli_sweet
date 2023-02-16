const Router = require("express");
const filesController = require("../controllers/files-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const fs = require("fs");
const multer = require("multer");

const store = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync("uploads", { recursive: true });
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const uploadFiles = multer({ storage: store }).array("file");

router.post("/download", uploadFiles, filesController.downloadImage);
router.delete("/delete/:id", authMiddleware, filesController.deleteImage);

module.exports = router;
