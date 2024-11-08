const { jwtVerify } = require("../utils/jwt.js");

// Middleware to authenticate user
const authMiddleware = (req, res, next) => {
  const bearer = req.header("Authorization");

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: 401, message: "Authorization denied" });
  }

  const token = bearer.split(" ")[1];

  jwtVerify(token, (error, decoded) => {
    if (error) {
      return res
        .status(403)
        .json({ status: 403, message: "Invalid token", error });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
