import { SendMessageRequest } from "@appTypes/message";
import { messageApi } from "@lib/api/message-api";
import { notificationApi } from "@lib/api/notification-api";
import { userLookupApi } from "@lib/api/user-lookup-api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query keys
export const messageKeys = {
  all: ["messages"] as const,
  lists: () => [...messageKeys.all, "list"] as const,
  list: (filters: any) => [...messageKeys.lists(), filters] as const,
  details: () => [...messageKeys.all, "detail"] as const,
  detail: (id: number) => [...messageKeys.details(), id] as const,
  unreadCount: () => [...messageKeys.all, "unread-count"] as const,
};

export const userLookupKeys = {
  teachers: ["users", "teachers"] as const,
  parents: ["users", "parents"] as const,
  students: ["users", "students"] as const,
};

export const useMessageApi = () => {
  const queryClient = useQueryClient();

  // Conversations
  const useGetConversations = () => {
    return useQuery({
      queryKey: messageKeys.lists(),
      queryFn: messageApi.getConversations,
    });
  };

  const useGetConversation = (conversationId: number) => {
    return useQuery({
      queryKey: messageKeys.detail(conversationId),
      queryFn: () => messageApi.getConversation(conversationId),
      enabled: !!conversationId,
    });
  };

  const useCreateConversation = () => {
    return useMutation({
      mutationFn: messageApi.createConversation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
      },
    });
  };

  const useSendMessage = (conversationId: number) => {
    return useMutation({
      mutationFn: (request: SendMessageRequest) =>
        messageApi.sendMessage(conversationId, request),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: messageKeys.detail(conversationId),
        });
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
        queryClient.invalidateQueries({ queryKey: messageKeys.unreadCount() });
      },
    });
  };

  const useMarkAsRead = () => {
    return useMutation({
      mutationFn: messageApi.markAsRead,
      onSuccess: (_, conversationId) => {
        queryClient.invalidateQueries({
          queryKey: messageKeys.detail(conversationId),
        });
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
        queryClient.invalidateQueries({ queryKey: messageKeys.unreadCount() });
      },
    });
  };

  const useCloseConversation = () => {
    return useMutation({
      mutationFn: messageApi.closeConversation,
      onSuccess: (_, conversationId) => {
        queryClient.invalidateQueries({
          queryKey: messageKeys.detail(conversationId),
        });
        queryClient.invalidateQueries({ queryKey: messageKeys.lists() });
      },
    });
  };

  const useGetUnreadCount = () => {
    return useQuery({
      queryKey: messageKeys.unreadCount(),
      queryFn: messageApi.getUnreadCount,
    });
  };

  // User Lookup
  const useGetTeachers = () => {
    return useQuery({
      queryKey: userLookupKeys.teachers,
      queryFn: userLookupApi.getTeachers,
    });
  };

  const useGetStudents = () => {
    return useQuery({
      queryKey: userLookupKeys.students,
      queryFn: userLookupApi.getStudents,
    });
  };

  // Notifications
  const useRegisterDevice = () => {
    return useMutation({
      mutationFn: ({
        expoPushToken,
        deviceType,
        userId,
      }: {
        expoPushToken: string;
        deviceType: string;
        userId: string;
      }) => notificationApi.registerDevice(expoPushToken, deviceType, userId),
    });
  };

  return {
    // Conversations
    useGetConversations,
    useGetConversation,
    useCreateConversation,
    useSendMessage,
    useMarkAsRead,
    useCloseConversation,
    useGetUnreadCount,

    // User Lookup
    useGetTeachers,
    useGetStudents,

    // Notifications
    useRegisterDevice,
  };
};
