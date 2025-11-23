import { View, Text, TouchableOpacity } from "react-native";

interface NotificationErrorBannerProps {
  error: string;
  onRetry?: () => void;
}

export default function NotificationErrorBanner({
  error,
  onRetry,
}: NotificationErrorBannerProps) {
  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "#ff6b6b",
        padding: 12,
        borderRadius: 8,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 14, flex: 1 }}>{error}</Text>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} style={{ marginLeft: 8 }}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
