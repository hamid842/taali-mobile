import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useMessageApi } from "@hooks/use-message-api";

export default function ConversationScreen() {
  const { conversationId } = useLocalSearchParams();
  const { useGetConversation } = useMessageApi();
  const { data: conversation, isLoading } = useGetConversation(
    Number(conversationId)
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading conversation...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Conversation with {conversation?.receiver.firstName}
      </Text>
      {/* Add your conversation UI here */}
    </View>
  );
}
