import jwt from "jsonwebtoken";

export const SECRET_KEY = "CLAMART";

export function generateToken(account) {
    const payload = { account };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}