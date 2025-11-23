import { useFonts } from "expo-font";

export function useLoadFonts() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    NotoSans: require("../assets/fonts/NotoSansArabic.ttf"),
    "iran-sans": require("../assets/fonts/iran-sans.ttf"),
    "vazir-bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
    "vazir": require("../assets/fonts/Vazirmatn-Regular.ttf"),
  });

  return loaded;
}
