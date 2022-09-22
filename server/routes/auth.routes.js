const Router = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Введен некорректный email").isEmail(),
    check(
      "password",
      "Введен некорректный пароль (длина 5-15 символов)"
    ).isLength({ min: 5, max: 15 }),
    check("name", "Введено некорректное имя").isLength({ min: 2, max: 15 }),
    check("phone", "Введен некорректный телефон").isMobilePhone(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Данные введены неверно: ", errors });
      }

      const { email, password, phone, name } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword, phone, name });

      await user.save();
      return res.json({ message: "Пользователь был создан" });
    } catch (e) {
      console.log("regiter error... ", e.message);
    }
  }
);

router.post(
  "/login",

  async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Пользователь с таким email не найден" });
      }
      const isPassValid = bcrypt.compareSync(password, user.password);
      if (!isPassValid) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (e) {
      console.log("login error... ", e.message);
      res.send({ message: "login error" });
    }
  }
);

module.exports = router;
