import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "@hooks/use-theme";
import ThemedView from "./ThemedView";

interface PasswordInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function PasswordInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  ...textInputProps
}: PasswordInputProps<T>) {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: required ? `${label} is required` : false,
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ThemedView background="card" className="mb-6">
      {/* Label */}
      <Text
        className={`text-sm font-medium mb-2 ${
          isDark ? "text-dark-text" : "text-light-text"
        }`}
        // style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      {/* Input with Eye Icon */}
      <View className="relative">
        <TextInput
          ref={field.ref}
          value={field.value}
          onChangeText={field.onChange}
          onBlur={field.onBlur}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
          secureTextEntry={!isPasswordVisible}
          className={`rounded-xl px-4 py-3 border pr-12 ${
            error
              ? "border-red-500"
              : isDark
              ? "border-dark-border"
              : "border-light-border"
          } ${
            isDark
              ? "bg-dark-background text-dark-text"
              : "bg-white text-light-text"
          }`}
          style={{
            textAlign: isRTL ? "right" : "left",
            writingDirection: "ltr",
          }}
          {...textInputProps}
        />

        {/* Eye Icon */}
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 justify-center"
          
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color={isDark ? "#94A3B8" : "#64748B"}
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error && (
        <Text
          className="text-red-500 text-xs mt-1"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {error.message}
        </Text>
      )}
    </ThemedView>
  );
}
