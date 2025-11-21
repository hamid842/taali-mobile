import { Text, TextInput, TextInputProps, View } from "react-native";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTheme } from "contexts/ThemeContext";

interface FormInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  ...textInputProps
}: FormInputProps<T>) {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: required ? `${label} is required` : false,
    },
  });

  return (
    <View className="mb-6">
      {/* Label */}
      <Text
        className={`text-sm font-medium mb-2 ${
          isDark ? "text-dark-text" : "text-light-text"
        }`}
        style={{ textAlign: isRTL ? "right" : "left" }}
      >
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      {/* Input */}
      <TextInput
        ref={field.ref}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "#64748B" : "#94A3B8"}
        className={`rounded-xl px-4 py-3 border ${
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
          writingDirection: isRTL ? "rtl" : "ltr",
        }}
        {...textInputProps}
      />

      {/* Error Message */}
      {error && (
        <Text
          className="text-red-500 text-xs mt-1"
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
