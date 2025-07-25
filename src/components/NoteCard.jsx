import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NoteCard = ({ note, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm active:bg-slate-50"
      activeOpacity={0.9}
    >
      <View className="flex-row items-center mb-2">
        <Ionicons name="document-text-outline" size={20} color="#818cf8" />
        <Text
          className="text-lg font-bold text-slate-800 ml-2 pr-16"
          numberOfLines={1}
        >
          {note.title}
        </Text>
      </View>
      <Text className="text-slate-600 leading-snug" numberOfLines={3}>
        {note.content}
      </Text>
    </TouchableOpacity>
  );
};

export default NoteCard;
