require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const router = require("./routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://ameli-sweet.vercel.app",
  })
);
app.use("/uploads", express.static("./uploads"));
app.use("/api", router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log("Server start...", PORT);
    });
  } catch (e) {
    console.log("Server error... ", e.message);
    process.exit(1);
  }
};

start();
