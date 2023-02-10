const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config({ path: "./config.env" });

exports.register = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email,
      password,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({
      status: "register success",
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      message: "Authentification réussie",
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }),
    });
  } catch (err) {
    res.status(500).json({ error: "login faild" });
  }
};

exports.resetPassword = async (req, res, next) => {
  const decodedToken = jwt.verify(req.params.resetToken, process.env.JWT_SECRET);
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return new ErrorResponse("Utilisateur non trouvé", 404);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  user.password = hash;
  await user.save();
  res.status(200).json({ success: true, data: "Mot de passe mis à jour" });
};
