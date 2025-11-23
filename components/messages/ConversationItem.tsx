import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { Conversation } from "@appTypes/message";
import { User } from "@appTypes/auth";

interface ConversationItemProps {
  conversation: Conversation;
  theme: "light" | "dark";
  onPress: (conversation: Conversation) => void;
  getOtherParticipant: (conversation: Conversation) => User;
}

export function ConversationItem({
  conversation,
  theme,
  onPress,
  getOtherParticipant,
}: ConversationItemProps) {
  const otherParticipant = getOtherParticipant(conversation);
  const hasUnread = conversation.unreadCount > 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ABSENCE":
        return "#FF6B6B";
      case "ACADEMIC":
        return "#4ECDC4";
      case "BEHAVIOR":
        return "#FFD166";
      case "GENERAL":
        return "#118AB2";
      default:
        return "#666";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <TouchableOpacity
      className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700"
      onPress={() => onPress(conversation)}
    >
      <View className="flex-row items-start">
        <View className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-600 justify-center items-center mr-3">
          <Ionicons
            name={getIcon("user")}
            size={24}
            color={theme === "dark" ? "#94A3B8" : "#64748B"}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text
              className={`flex-1 text-base ${
                hasUnread ? "font-semibold" : "font-normal"
              } text-slate-900 dark:text-slate-100`}
              numberOfLines={1}
            >
              {otherParticipant.firstName} {otherParticipant.lastName}
            </Text>

            <Text className="text-xs text-slate-500 dark:text-slate-400 ml-2">
              {formatDate(conversation.lastMessageAt)}
            </Text>
          </View>

          <Text
            className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 mb-1.5"
            numberOfLines={1}
          >
            {conversation.subject}
          </Text>

          {conversation.lastMessage && (
            <Text
              className={`text-sm ${
                hasUnread ? "font-medium" : "font-normal"
              } text-slate-600 dark:text-slate-300`}
              numberOfLines={2}
            >
              {conversation.lastMessage.content}
            </Text>
          )}

          <View className="flex-row items-center mt-2">
            <View
              style={{
                backgroundColor: getCategoryColor(conversation.category),
              }}
              className="px-2 py-1 rounded-full mr-2"
            >
              <Text className="text-white text-xs font-medium">
                {conversation.category}
              </Text>
            </View>

            {conversation.student && (
              <Text className="text-xs text-slate-500 dark:text-slate-400 mr-2">
                • {conversation.student.name}
              </Text>
            )}

            {hasUnread && (
              <View className="bg-red-500 rounded-full px-1.5 py-1 ml-auto">
                <Text className="text-white text-xs font-semibold">
                  {conversation.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
