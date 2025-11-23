import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNotifications } from "@hooks/use-notifications";
import { useRouter } from "expo-router";

export default function NotificationPermissionRequest() {
  const { initializeNotifications, error } = useNotifications();
  const router = useRouter();

  const handleEnableNotifications = async () => {
    try {
      await initializeNotifications(router);
    } catch (err) {
      console.log("handleEnableNotifications Error:", err);
      Alert.alert(
        "Permission Required",
        "Please enable notifications in your device settings to receive important updates.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: "#e3f2fd",
        borderRadius: 8,
        margin: 16,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
        Enable Notifications
      </Text>
      <Text style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
        Get instant updates about messages, announcements, and important school
        information.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#1976d2",
          padding: 12,
          borderRadius: 6,
          alignItems: "center",
        }}
        onPress={handleEnableNotifications}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>
          Enable Notifications
        </Text>
      </TouchableOpacity>
      {error && (
        <Text style={{ color: "#d32f2f", fontSize: 12, marginTop: 8 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
