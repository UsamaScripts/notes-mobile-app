import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NoteCard = ({ title, content, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 my-2 shadow"
    >
      <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
        {title}
      </Text>
      <Text className="text-gray-600 mt-1" numberOfLines={2}>
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteCard;