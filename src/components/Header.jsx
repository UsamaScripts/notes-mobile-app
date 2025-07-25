import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const Header = ({ title, onPress }) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-4">
      <TouchableOpacity
        onPress={
          onPress ? onPress : () => router.replace("/(auth)/auth-screen")
        }
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold">{title}</Text>
      <View style={{ width: 28 }} />
    </View>
  );
};

export default Header;
