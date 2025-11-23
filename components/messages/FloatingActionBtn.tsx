import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionBtn({ onPress }: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-5 right-5 bg-blue-500 w-14 h-14 rounded-full justify-center items-center shadow-lg shadow-black"
      onPress={onPress}
    >
      <Ionicons name={getIcon("messages")} size={24} color="white" />
    </TouchableOpacity>
  );
}
