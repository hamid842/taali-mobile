import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getIcon } from "@appUtils/get-icon";
import { Conversation } from "@appTypes/message";
import { User } from "@appTypes/auth";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

interface ConversationItemProps {
  conversation: Conversation;
  theme: "light" | "dark";
  onPress: (conversation: Conversation) => void;
  getOtherParticipant: (conversation: Conversation) => User;
}

const getCategoryColor = (category: string, theme: "light" | "dark") => {
  const colors = {
    ABSENCE: { light: "#EF4444", dark: "#DC2626" },
    ACADEMIC: { light: "#06B6D4", dark: "#0891B2" },
    BEHAVIOR: { light: "#F59E0B", dark: "#D97706" },
    GENERAL: { light: "#8B5CF6", dark: "#7C3AED" },
  };

  const defaultColor = theme === "dark" ? "#6B7280" : "#9CA3AF";
  const categoryColor = colors[category as keyof typeof colors];

  return categoryColor
    ? theme === "dark"
      ? categoryColor.dark
      : categoryColor.light
    : defaultColor;
};

const getCategoryLabel = (category: string, t: any) => {
  const labels = {
    ABSENCE: t("messages.categories.absence", "Absence"),
    ACADEMIC: t("messages.categories.academic", "Academic"),
    BEHAVIOR: t("messages.categories.behavior", "Behavior"),
    GENERAL: t("messages.categories.general", "General"),
  };

  return labels[category as keyof typeof labels] || category;
};

export const formatDate = (
  dateString: string | undefined | null,
  t: TFunction
) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1)
    return t("messages.time.minutesAgo", {
      count: 0,
      defaultValue: "Just now",
    });
  if (diffMinutes < 60) {
    return t("messages.time.minutesAgo", {
      count: diffMinutes,
      defaultValue: `${diffMinutes}m ago`,
    });
  } else if (diffHours < 24) {
    return t("messages.time.hoursAgo", {
      count: diffHours,
      defaultValue: `${diffHours}h ago`,
    });
  } else if (diffDays === 1) {
    return t("messages.time.yesterday", { defaultValue: "Yesterday" });
  } else if (diffDays < 7) {
    return t("messages.time.daysAgo", {
      count: diffDays,
      defaultValue: `${diffDays}d ago`,
    });
  } else {
    // Use locale-aware formatting; you can pass i18n.language if needed
    return date.toLocaleDateString();
  }
};

export function ConversationItem({
  conversation,
  theme,
  onPress,
  getOtherParticipant,
}: ConversationItemProps) {
  const { t } = useTranslation();
  const otherParticipant = getOtherParticipant(conversation);
  const hasUnread = conversation.unreadCount > 0;
  const categoryColor = getCategoryColor(conversation.category, theme);
  const formattedDate = formatDate(conversation.lastMessageAt, t);
  const categoryLabel = getCategoryLabel(conversation.category, t);

  return (
    <TouchableOpacity
      className={`mx-4 my-1 rounded-2xl p-4 ${
        hasUnread
          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
          : "bg-white dark:bg-slate-800"
      } shadow-sm`}
      onPress={() => onPress(conversation)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start gap-2">
        {/* Avatar */}
        <View
          className={`w-12 h-12 rounded-full ${
            hasUnread
              ? "bg-blue-100 dark:bg-blue-800"
              : "bg-slate-100 dark:bg-slate-700"
          } justify-center items-center`}
        >
          <Ionicons
            name={getIcon("user")}
            size={20}
            color={
              hasUnread ? "#3B82F6" : theme === "dark" ? "#94A3B8" : "#64748B"
            }
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Header Row */}
          <View className="flex-row justify-between items-start mb-1">
            <Text
              className={`flex-1 text-lg font-semibold ${
                hasUnread
                  ? "text-blue-900 dark:text-blue-100"
                  : "text-slate-900 dark:text-slate-100"
              }`}
              numberOfLines={1}
            >
              {otherParticipant.firstName} {otherParticipant.lastName}
            </Text>

            <Text
              className={`text-xs ${
                hasUnread
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400"
              } ml-2`}
            >
              {formattedDate}
            </Text>
          </View>

          {/* Subject */}
          <Text
            className={`text-sm font-medium mb-1 ${
              hasUnread
                ? "text-blue-700 dark:text-blue-300"
                : "text-slate-600 dark:text-slate-300"
            }`}
            numberOfLines={1}
          >
            {conversation.subject}
          </Text>

          {/* Last Message Preview */}
          {conversation.lastMessage && (
            <Text
              className={`text-sm mb-2 ${
                hasUnread
                  ? "text-slate-700 dark:text-slate-200 font-medium"
                  : "text-slate-500 dark:text-slate-400"
              }`}
              numberOfLines={2}
            >
              {conversation.lastMessage.content}
            </Text>
          )}

          {/* Footer */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-wrap">
              {/* Category Badge */}
              <View
                style={{ backgroundColor: categoryColor }}
                className="px-3 py-1 rounded-full"
              >
                <Text className="text-white text-xs font-semibold">
                  {categoryLabel}
                </Text>
              </View>

              {/* Student Info */}
              {conversation.student && (
                <View className="flex-row items-center ml-2">
                  <Text className="text-xs text-slate-500 dark:text-slate-400">
                    • {conversation.student.name}
                  </Text>
                  <Text className="text-xs text-slate-400 dark:text-slate-500 ml-1">
                    {t("messages.grade", "Grade")} {conversation.student.grade}
                  </Text>
                </View>
              )}
            </View>

            {/* Unread Count */}
            {hasUnread && (
              <View className="bg-red-500 rounded-full min-w-[20px] h-5 justify-center items-center">
                <Text className="text-white text-xs font-bold px-1">
                  {conversation.unreadCount > 99
                    ? "99+"
                    : conversation.unreadCount}
                </Text>
              </View>
            )}

            {/* Message Count */}
            {!hasUnread && conversation.messageCount > 0 && (
              <Text className="text-xs text-slate-400 dark:text-slate-500">
                {conversation.messageCount} {t("messages.messages", "messages")}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
