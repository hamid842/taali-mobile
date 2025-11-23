import { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useMessageApi } from "@hooks/use-message-api";
import { useAuth } from "@hooks/use-auth";
import { useTheme } from "@hooks/use-theme";
import { useTranslation } from "react-i18next";
import { Conversation } from "@appTypes/message";
import ThemedView from "@components/common/ThemedView";
import MessagesHeader from "@components/messages/MessagesHeader";
import { ConversationItem } from "@components/messages/ConversationItem";
import { LoadingState } from "@components/messages/LoadingState";
import { ErrorState } from "@components/messages/ErrorState";
import { MessagesSearchBar } from "@components/messages/MessagesSearchBar";
import MessagesEmptyState from "@components/messages/EmptyMessages";
import { FloatingActionBtn } from "@components/messages/FloatingActionBtn";

export default function MessagesScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { useGetConversations, useGetUnreadCount, useMarkAsRead } =
    useMessageApi();

  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: conversations,
    isLoading,
    error,
    refetch,
  } = useGetConversations();

  const conversationsData = conversations?.data?.data || [];
  const { data: unreadCount } = useGetUnreadCount();
  const { mutate: markAsRead } = useMarkAsRead();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleConversationPress = (conversation: Conversation) => {
    if (conversation.unreadCount > 0) {
      markAsRead(conversation.id);
    }

    router.push({
      pathname: "/(panel)/messages/conversation",
      params: {
        conversationId: conversation.id,
        receiverName: `${conversation.receiver.firstName} ${conversation.receiver.lastName}`,
      },
    });
  };

  const handleNewMessage = () => {
    router.push("/(panel)/messages/new");
  };

  const filteredConversations =
    conversationsData?.filter((conversation: Conversation) => {
      const searchLower = searchQuery.toLowerCase();
      const receiverName =
        `${conversation.receiver.firstName} ${conversation.receiver.lastName}`.toLowerCase();
      const subject = conversation.subject.toLowerCase();
      const lastMessage = conversation.lastMessage?.content.toLowerCase() || "";

      return (
        receiverName.includes(searchLower) ||
        subject.includes(searchLower) ||
        lastMessage.includes(searchLower)
      );
    }) || [];

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.initiator.id === user?.id
      ? conversation.receiver
      : conversation.initiator;
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <ThemedView className="flex-1 bg-slate-50 dark:bg-slate-900">
      <MessagesHeader
        title={t("messages.pageTitle")}
        unreadCount={unreadCount}
      />

      <MessagesSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClear={() => setSearchQuery("")}
      />

      <FlatList
        data={filteredConversations}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            theme={theme}
            onPress={handleConversationPress}
            getOtherParticipant={getOtherParticipant}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme === "dark" ? "#F1F5F9" : "#3B82F6"}
          />
        }
        ListEmptyComponent={
          <MessagesEmptyState onNewMessage={handleNewMessage} />
        }
      />

      <FloatingActionBtn onPress={handleNewMessage} />
    </ThemedView>
  );
}
