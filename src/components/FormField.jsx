import React from "react";
import { View, Text, TextInput } from "react-native";

const FormField = ({ label, placeholder, value, onChangeText, onBlur, error, multiline }) => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-1">{label}</Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        textAlignVertical={multiline ? "top" : "center"}
      />

      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};

export default FormField;