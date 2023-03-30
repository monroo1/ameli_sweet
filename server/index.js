require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const authRouter = require("./routes/auth.routes");
const productsRouter = require("./routes/products.routes");
const filesRouter = require("./routes/files.routes");
const categoryRouter = require("./routes/category.routes");
const fillingRouter = require("./routes/filling.routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/uploads", express.static("./uploads"));
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/files", filesRouter);
app.use("/api/category", categoryRouter);
app.use("/api/filling", fillingRouter);
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
