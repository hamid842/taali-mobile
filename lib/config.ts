import Constants from "expo-constants";
import * as Device from "expo-device";

export interface AppConfig {
  API_BASE_URL: string;
}

// When running on your Linux machine, physical phones cannot access "localhost".
// You must use your MACHINE IP:
const LOCAL_MACHINE_IP = "192.168.1.2"; // Replace with your real LAN IP

const developmentConfig: AppConfig = {
  API_BASE_URL: `http://${LOCAL_MACHINE_IP}:8080/api`,
};

const androidEmulatorConfig: AppConfig = {
  API_BASE_URL: "http://10.0.2.2:8080/api", // Only emulator
};

const productionConfig: AppConfig = {
  API_BASE_URL: "https://your-production-api.com/api",
};

export const getConfig = (): AppConfig => {
  if (__DEV__) {
    // Android
    if (Constants.platform?.android) {
      // Emulator → use 10.0.2.2
      if (!Device.isDevice) {
        return androidEmulatorConfig;
      }

      // Physical device → use your laptop's IP
      return developmentConfig;
    }

    // iOS emulator automatically supports localhost
    if (Constants.platform?.ios) {
      return developmentConfig;
    }
  }

  // Production
  return productionConfig;
};

export const config = getConfig();
