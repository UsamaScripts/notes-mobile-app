import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useGetNotesQuery, useDeleteNoteMutation } from "@/service/notesApi";
import { Ionicons } from "@expo/vector-icons";
import NoteCard from "../../../components/NoteCard";

const NotesList = () => {
  const { token } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error, refetch, isFetching } = useGetNotesQuery(
    { page, limit },
    { skip: !token }
  );
  const [deleteNote] = useDeleteNoteMutation();

  useEffect(() => {
    if (!token) {
      Toast.show({
        type: "error",
        text1: "Unauthorized",
        text2: "Please login first",
        position: "bottom",
      });
      router.replace("/(auth)/sign-in");
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Failed to load notes",
        text2: error?.data?.message || "Something went wrong",
      });
    }
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id).unwrap();
      Toast.show({
        type: "success",
        text1: "Note deleted successfully",
      });
      refetch();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: err?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-600 mt-4">Loading notes...</Text>
      </SafeAreaView>
    );
  }

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const renderNoteItem = ({ item }) => (
    <View className="relative">
      <View className="absolute right-3 top-3 flex-row gap-3 z-10">
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/(root)/(notes)/edit-note-screen?id=${item._id}&title=${encodeURIComponent(
                item.title
              )}&content=${encodeURIComponent(item.content)}`
            )
          }
        >
          <Ionicons name="create-outline" size={20} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>

      <NoteCard
        title={item.title}
        content={item.content}
        onPress={() =>
          router.push(
            `/(root)/(notes)/note-detail-screen?id=${item._id}&title=${encodeURIComponent(item.title)}&content=${encodeURIComponent(item.content)}`
          )
        }
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      <View className="bg-green-800 p-6 rounded-lg mb-4">
        <Text className="text-xl text-white font-bold text-center">
          Your Notes
        </Text>
      </View>

      {notes.length === 0 ? (
        <View className="flex items-center justify-center mt-10">
          <Text className="text-gray-500 text-lg">
            No notes available. Add your first note!
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item._id}
          renderItem={renderNoteItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            totalPages > page ? (
              <TouchableOpacity
                className="bg-primary p-3 rounded-lg mt-4 mb-8"
                onPress={() => setPage(page + 1)}
                disabled={isFetching}
              >
                <Text className="text-white text-center font-semibold">
                  {isFetching ? "Loading..." : "Load More"}
                </Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
      <TouchableOpacity
        onPress={() => router.push("/(root)/(notes)/add-note-screen")}
        className="absolute bottom-8 right-8 bg-primary rounded-full p-4 shadow-lg"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotesList;
