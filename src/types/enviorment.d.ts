declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      DEV_ORIGIN?: string;
      PROD_ORIGIN?: string;
    }
  }
}
