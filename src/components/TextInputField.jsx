import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Fontisto, Feather } from "@expo/vector-icons";

export const TextInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  onBlur,
  touched,
  iconName,
  maxLength,
  iconColor = "#6552E1",
  secureToggle = false,
  isSecure = false,
  setIsSecure = () => {},
  keyboardType = "default",
}) => {
  return (
    <View className="w-full mb-2">
      {label && (
        <Text className="text-gray-600 text-base font-semibold mb-2">
          {label}
        </Text>
      )}

      <View className="flex-row  items-center bg-white px-4 py-2 rounded-2xl border border-gray-300">
        {iconName && <Fontisto name={iconName} size={20} color={iconColor} />}
        <TextInput
          className="flex-1 ml-3 text-gray-800 h-10"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          maxLength={maxLength}
          secureTextEntry={secureToggle ? isSecure : false}
        />

        {secureToggle && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Feather
              name={isSecure ? "eye" : "eye-off"}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
      <View>
        {error && touched ? (
          <View className="mt-1">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
