import jwt from "jsonwebtoken";
import config from "../../config/config";

export const genereteToken = (userName:string, language: string) => {
    const token = jwt.sign({userName, language}, config.jwtSecret, {expiresIn: '1h'});
    return token;
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded;
    } catch (err) {
        return false;
    }
}
