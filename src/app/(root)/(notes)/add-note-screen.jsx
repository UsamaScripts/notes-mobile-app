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
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useCreateNoteMutation } from "@/service/notesApi";
import NoteForm from "../../../components/NoteForm";
import { Ionicons } from "@expo/vector-icons";

const AddNote = () => {
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const handleCreate = async (values) => {
    if (!values.title.trim() || !values.content.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please provide both a title and content for your note.",
        position: "bottom",
      });
      return;
    }

    try {
      await createNote({
        title: values.title,
        content: values.content,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Note Created Successfully",
        position: "bottom",
      });

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/(root)/(notes)/note-list-screen");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Creation Failed",
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

        <Text className="text-xl font-bold text-slate-800">
          Create a New Note
        </Text>

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
            initialValues={{ title: "", content: "" }}
            onSubmit={handleCreate}
            buttonLabel={isLoading ? "Creating..." : "Create Note"}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNote;
