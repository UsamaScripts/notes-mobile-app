import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import NoteForm from "../../../components/NoteForm";
import { useUpdateNoteMutation } from "@/service/notesApi";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const EditNote = () => {
  const { id, title, content } = useLocalSearchParams();

  const decodedTitle = decodeURIComponent(title || "");
  const decodedContent = decodeURIComponent(content || "");

  const [updateNote, { isLoading }] = useUpdateNoteMutation();

  const handleUpdate = async (values) => {
    if (!values.title.trim() || !values.content.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Title and content cannot be empty.",
        position: "bottom",
      });
      return;
    }

    try {
      await updateNote({
        id,
        body: {
          title: values.title,
          content: values.content,
        },
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Note Updated Successfully",
        position: "bottom",
      });

      if (router.canGoBack()) {
        router.back();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error?.data?.message || "Something went wrong",
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
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

        <Text className="text-xl font-bold text-slate-800">Edit Note</Text>

        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ padding: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <NoteForm
            initialValues={{ title: decodedTitle, content: decodedContent }}
            onSubmit={handleUpdate}
            buttonLabel={isLoading ? "Updating..." : "Update Note"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditNote;
