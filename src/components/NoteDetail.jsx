import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const NoteDetail = () => {
  const { title, content } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-xl p-5 shadow">
        <Text className="text-2xl font-bold text-gray-900 mb-3">
          {decodeURIComponent(title)}
        </Text>
        <Text className="text-gray-700 text-base leading-6">
          {decodeURIComponent(content)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default NoteDetail;
