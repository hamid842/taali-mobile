import Constants from "expo-constants";

export interface AppConfig {
  API_BASE_URL: string;
}

const developmentConfig: AppConfig = {
  API_BASE_URL: "http://localhost:8080/api",
};

const androidEmulatorConfig: AppConfig = {
  API_BASE_URL: "http://10.0.2.2:8080/api",
};

const productionConfig: AppConfig = {
  API_BASE_URL: "https://your-production-api.com/api",
};

export const getConfig = (): AppConfig => {
  if (__DEV__) {
    if (Constants.platform?.android) {
      return androidEmulatorConfig;
    }
    return developmentConfig;
  }
  return productionConfig;
};

export const config = getConfig();
