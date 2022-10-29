import { RequestHandler, type Response, type Request } from "express";
import { request } from "http";
import { verifyToken } from "../helper/jwt/jwtHelper";
import logger from "../logger/logger";
/**
 * Auth middleware
 */
const auth: RequestHandler = (req: Request, res: Response, next) => {
  let authorizationHeader: string = (req.headers["x-authentication"] as string);
  
  if (!authorizationHeader) {
    logger.info(`no token`);
  }

  // verifyToken
  const results = verifyToken(authorizationHeader);
  if(results){
    // @ts-ignore
    req.decoded = results;
  }
  next();

};

export default auth;
