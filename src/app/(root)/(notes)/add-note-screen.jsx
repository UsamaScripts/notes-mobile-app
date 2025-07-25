import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import NoteForm from "../../../components/NoteForm";
import { useCreateNoteMutation } from "@/service/notesApi";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const AddNote = () => {
  const [createNote, { isLoading }] = useCreateNoteMutation();

  const handleCreate = async (values) => {
    try {
      await createNote({
        title: values.title,
        content: values.content,
      }).unwrap();

      Toast.show({
        type: "success",
        text1: "Note created successfully",
        position: "bottom",
      });

      router.replace("/(root)/(notes)/note-list-screen");
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
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-green-800 p-6">
        <Text className="text-white text-xl font-bold text-center">Add New Note</Text>
      </View>
      <NoteForm
        initialValues={{ title: "", content: "" }}
        onSubmit={handleCreate}
        buttonLabel={isLoading ? "Creating..." : "Create Note"}
      />
    </SafeAreaView>
  );
};

export default AddNote;