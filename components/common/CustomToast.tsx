import { FC } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";

interface ToastProps {
  text1?: string;
  text2?: string;
}

interface CustomToastProps {
  props: ToastProps;
  color: string;
  backgroundColor: string;
}

const CustomToast: FC<CustomToastProps> = ({
  props,
  color,
  backgroundColor,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  return (
    <View
      style={{
        width: "95%",
        minHeight: 60,
        backgroundColor,
        borderRadius: 12,
        flexDirection: isRTL ? "row-reverse" : "row",
        alignItems: "center",
        marginVertical: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 4,
          backgroundColor: color,
          height: "70%",
          borderRadius: 2,
          marginLeft: 12,
          marginRight: 8,
        }}
      />
      <View style={{ flex: 1, paddingVertical: 14, paddingRight: 16 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 4,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {props.text1}
        </Text>
        <Text
          style={{
            fontSize: 14,
            lineHeight: 18,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {props.text2}
        </Text>
      </View>
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: (props) => (
    <CustomToast props={props} color="#4CAF50" backgroundColor="#F0FFF0" />
  ),
  error: (props) => (
    <CustomToast props={props} color="#F44336" backgroundColor="#FFE6E6" />
  ),
  info: (props) => (
    <CustomToast props={props} color="#2196F3" backgroundColor="#E6F3FF" />
  ),
};

type ToastParams = {
  type: "success" | "error" | "info";
  message: string;
  header?: string;
  position?: "top" | "bottom";
};

export const showToast = (params: ToastParams) => {
  Toast.show({
    type: params.type,
    position: params.position || "top",
    text1: params.header,
    text2: params.message,
    visibilityTime: 3000,
  });
};

export const ToastContainer = () => <Toast config={toastConfig} />;
