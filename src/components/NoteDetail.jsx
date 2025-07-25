import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const NoteDetail = () => {
  const { id, title, content } = useLocalSearchParams();

  const decodedTitle = decodeURIComponent(title || "");
  const decodedContent = decodeURIComponent(content || "");

  const handleEdit = () => {
    router.push(
      `/(root)/(notes)/edit-note-screen?id=${id}&title=${encodeURIComponent(
        decodedTitle
      )}&content=${encodeURIComponent(decodedContent)}`
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-slate-200 shadow-sm">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full active:bg-slate-100"
        >
          <Ionicons name="arrow-back" size={24} color="#4f46e5" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-slate-800" numberOfLines={1}>
          Note Details
        </Text>

        <TouchableOpacity
          onPress={handleEdit}
          className="p-2 rounded-full active:bg-slate-100"
        >
          <Ionicons name="create-outline" size={24} color="#4f46e5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        <Text className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          {decodedTitle}
        </Text>

        <Text className="text-lg text-slate-700 leading-relaxed">
          {decodedContent}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteDetail;
