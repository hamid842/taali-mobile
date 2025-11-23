import {
  Conversation,
  CreateConversationRequest,
  Message,
  SendMessageRequest,
} from "@appTypes/message";
import { apiClient, apiConfig } from "@lib/apiConfig";

export const messageApi = {
  // Get all conversations for current user
  getConversations: async (): Promise<Conversation[]> => {
    return (
      apiClient.get<Conversation[]>(apiConfig.endpoints.conversations.list)
    );
  },

  // Get specific conversation with messages
  getConversation: async (conversationId: number): Promise<Conversation> => {
    return apiClient.get<Conversation>(
      apiConfig.endpoints.conversations.getById(conversationId)
    );
  },

  // Create new conversation
  createConversation: async (
    request: CreateConversationRequest
  ): Promise<Conversation> => {
    return apiClient.post<Conversation>(
      apiConfig.endpoints.conversations.create,
      request
    );
  },

  // Send message in existing conversation
  sendMessage: async (
    conversationId: number,
    request: SendMessageRequest
  ): Promise<Message> => {
    return apiClient.post<Message>(
      apiConfig.endpoints.conversations.sendMessage(conversationId),
      request
    );
  },

  // Mark conversation as read
  markAsRead: async (conversationId: number): Promise<void> => {
    return apiClient.put(
      apiConfig.endpoints.conversations.markAsRead(conversationId)
    );
  },

  // Close conversation
  closeConversation: async (conversationId: number): Promise<void> => {
    return apiClient.put(
      apiConfig.endpoints.conversations.closeConversation(conversationId)
    );
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<{ data: number }>(
      apiConfig.endpoints.conversations.unreadCount
    );
    return response.data;
  },
};
