import React, { useEffect, useState, useRef } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import NoteCard from "../../../components/NoteCard";

const NotesList = () => {
  const { token } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const limit = 5;
  const flatListRef = useRef(null);

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
        text2: "Please login first.",
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
        text2: error?.data?.message || "An unexpected error occurred.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id).unwrap();
      Toast.show({
        type: "success",
        text1: "Note Deleted Successfully",
      });
      refetch();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: err?.data?.message || "Could not delete the note.",
      });
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-slate-500 text-lg mt-4 font-semibold">
          Loading your notes...
        </Text>
      </SafeAreaView>
    );
  }

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  const renderNoteItem = ({ item }) => (
    <View className="relative mx-4 mb-4">
      <View className="absolute right-3 top-3 flex-row gap-x-2 z-10">
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/(root)/(notes)/edit-note-screen?id=${item._id}&title=${encodeURIComponent(
                item.title
              )}&content=${encodeURIComponent(item.content)}`
            )
          }
          className="p-2 rounded-full bg-slate-100 active:opacity-70"
        >
          <Ionicons name="create-outline" size={20} color="#4f46e5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          className="p-2 rounded-full bg-slate-100 active:opacity-70"
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
      <NoteCard
        note={item}
        onPress={() =>
          router.push(
            `/(root)/(notes)/note-detail-screen?id=${item._id}&title=${encodeURIComponent(item.title)}&content=${encodeURIComponent(item.content)}`
          )
        }
      />
    </View>
  );

  const PaginationControls = () => (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-t border-slate-200">
      <TouchableOpacity
        onPress={() => setPage(page - 1)}
        disabled={page === 1 || isFetching}
        className={`flex-row items-center gap-x-2 p-2 rounded-lg ${
          page === 1 ? "opacity-40" : "active:bg-slate-100"
        }`}
      >
        <Ionicons name="arrow-back-outline" size={22} color="#4f46e5" />
        <Text className="font-semibold text-indigo-600">Back</Text>
      </TouchableOpacity>

      <Text className="font-bold text-slate-500">
        Page {page} of {totalPages}
      </Text>

      <TouchableOpacity
        onPress={() => setPage(page + 1)}
        disabled={page >= totalPages || isFetching}
        className={`flex-row items-center gap-x-2 p-2 rounded-lg ${
          page >= totalPages ? "opacity-40" : "active:bg-slate-100"
        }`}
      >
        <Text className="font-semibold text-indigo-600">Next</Text>
        <Ionicons name="arrow-forward-outline" size={22} color="#4f46e5" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <LinearGradient
        colors={["#4338ca", "#312e81"]}
        className="p-6 pb-8 rounded-b-3xl shadow-lg"
      >
        <Text className="text-3xl text-white font-bold text-center tracking-wide">
          My Notes
        </Text>
        <Text className="text-center text-indigo-200 mt-1">
          Organize your thoughts
        </Text>
      </LinearGradient>

      {notes.length === 0 && !isFetching ? (
        <View className="flex-1 items-center justify-center px-8 gap-y-5">
          <Ionicons name="document-text-outline" size={90} color="#e2e8f0" />
          <Text className="text-slate-500 text-xl font-medium text-center leading-relaxed">
            No notes found.{"\n"}Ready to capture a great idea?
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(root)/(notes)/add-note-screen")}
            className="mt-4 flex-row items-center bg-indigo-600 px-6 py-3 rounded-full shadow-md active:bg-indigo-700"
          >
            <Ionicons name="add" size={22} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">
              Create First Note
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            data={notes}
            keyExtractor={(item) => item._id}
            renderItem={renderNoteItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          />
          {totalPages > 1 && <PaginationControls />}
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push("/(root)/(notes)/add-note-screen")}
        className="absolute bottom-16 right-3 bg-indigo-600 rounded-full p-4 shadow-lg active:bg-indigo-700"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NotesList;
