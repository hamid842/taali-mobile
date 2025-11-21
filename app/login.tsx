import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import FormInput from "components/common/FormInput";
import PasswordInput from "components/common/PasswordInput";
import { showToast } from "components/common/CustomToast";
import { useLoginMutation } from "hooks/use-auth-mutation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const loginMutation = useLoginMutation();

  const isRTL = i18n.language === "fa";

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginMutation.mutateAsync(data);

      if (result.success && result.userId) {
        showToast({
          type: "success",
          header: t("common.success"),
          message: result.message!,
        });
        router.push("(tabs)");
      } else {
        showToast({
          type: "error",
          header: t("common.error"),
          message: result.message!,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error)
        showToast({
          type: "error",
          header: t("common.error"),
          message: error.message,
        });
    }
  };
  const isLoginSubmitting = isSubmitting || loginMutation.isPending;
  return (
    <View
      className={`flex-1 ${
        isDark ? "bg-dark-background" : "bg-light-background"
      }`}
      style={{ paddingTop: insets.top }}
    >
      <Header title={t("login.title")} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 justify-center">
            {/* Logo Section */}
            <View className={`items-center mb-8 ${isRTL ? "rtl" : "ltr"}`}>
              <Image
                source={require("../assets/images/icon.png")}
                className="w-32 h-32 mb-6"
                resizeMode="contain"
              />

              {/* Welcome Text */}
              <Text
                className={`text-3xl font-bold mb-2 ${
                  isDark ? "text-dark-text" : "text-light-text"
                }`}
              >
                {t("login.welcome")}
              </Text>
              <Text
                className={`text-lg ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("login.loginButton")}
              </Text>
            </View>

            {/* Login Form */}
            <View
              className={`rounded-2xl p-6 ${
                isDark ? "bg-dark-card" : "bg-light-card"
              } shadow-lg ${isRTL ? "rtl" : "ltr"}`}
            >
              {/* Email Input */}
              <FormInput
                control={control}
                name="email"
                label={t("login.email")}
                placeholder={t("login.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />

              {/* Password Input */}
              <PasswordInput
                control={control}
                name="password"
                label={t("login.password")}
                placeholder={t("login.passwordPlaceholder")}
                required
              />

              {/* Forgot Password */}
              <TouchableOpacity
                className={`mb-6 ${isRTL ? "items-start" : "items-end"}`}
              >
                <Text
                  className={`font-medium ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {t("login.forgotPassword")}
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isLoginSubmitting}
                className={`rounded-xl py-4 mb-4 ${
                  isLoginSubmitting
                    ? "bg-gray-400"
                    : isDark
                    ? "bg-blue-600"
                    : "bg-blue-500"
                }`}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isLoginSubmitting ? "..." : t("login.loginButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
