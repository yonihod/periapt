export type ClientOrigins = {
  development: string;
  production: string;
};

export type NODE_ENV = "development" | "production";

export interface Config {
  version: string;
  name: string;
  description: string;
  nodeEnv: NODE_ENV | string;
  port: string | number;
  clientOrigins: ClientOrigins;
  jwtSecret: string; 
}
