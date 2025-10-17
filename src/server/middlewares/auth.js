import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/jwt";


// JWT 验证中间件
export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
}