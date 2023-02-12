const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.protect = async function(req, res, next) {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.replace(/^"|"$/g, '');
  }
  if (!token) {
    res.status(401).json({ error: "Not authorized to access this router" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: "Not authorized to access this router" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Not authorized to access this router" });
  }
};
