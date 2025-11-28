import dotenv from "dotenv";

dotenv.config();

interface EnvironmentConfig {
  MONGODB_URI: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config: EnvironmentConfig = {
  MONGODB_URI: getEnvVariable("MONGODB_URI"),
  PORT: parseInt(getEnvVariable("PORT", "8080"), 10),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  NODE_ENV: getEnvVariable("NODE_ENV", "development"),
};
