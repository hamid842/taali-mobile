import { View, Text, ActivityIndicator } from "react-native";

export default function NotificationSetupLoader() {
  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 12,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <ActivityIndicator size="small" color="#fff" />
      <Text style={{ color: "#fff", marginLeft: 12, fontSize: 14 }}>
        Setting up notifications...
      </Text>
    </View>
  );
}
