import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "contexts/ThemeContext";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="w-12 h-12 rounded-full items-center justify-center"
    >
      <Ionicons
        name={theme === "light" ? "moon" : "sunny"}
        size={24}
        color={theme === "light" ? "#1E293B" : "#F1F5F9"}
      />
    </TouchableOpacity>
  );
}
