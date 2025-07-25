import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import NoteDetail from "../../../components/NoteDetail";
import Header from "@/components/Header";

const NoteDetailScreen = () => {
  const { title, content } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Pass custom onPress to go back to notes list */}
      <Header
        title="Note Details"
        onPress={() => router.replace("/(root)/(notes)/note-list-screen")}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <NoteDetail
          title={decodeURIComponent(title)}
          content={decodeURIComponent(content)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteDetailScreen;
