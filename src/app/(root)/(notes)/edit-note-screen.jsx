import React from "react";
import { SafeAreaView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import NoteForm from "../../../components/NoteForm";
import { useUpdateNoteMutation } from "@/service/notesApi";
import Toast from "react-native-toast-message";

const EditNote = () => {
  const { id, title, content } = useLocalSearchParams();
  const decodedTitle = decodeURIComponent(title || "");
  const decodedContent = decodeURIComponent(content || "");

  const [updateNote, { isLoading }] = useUpdateNoteMutation();

  const handleUpdate = async (values) => {
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
        text1: "Note updated successfully",
        position: "bottom",
      });

      router.back();
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
      className="flex-1 bg-gray-100"
      style={{ justifyContent: "center" }}
    >
      <NoteForm
        initialValues={{ title: decodedTitle, content: decodedContent }}
        onSubmit={handleUpdate}
        buttonLabel={isLoading ? "Updating..." : "Update Note"}
      />
    </SafeAreaView>
  );
};

export default EditNote;
