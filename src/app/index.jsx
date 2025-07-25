import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? (
    <Redirect href="/(root)/(notes)/note-list-screen" />
  ) : (
    <Redirect href="/(auth)/auth-screen" />
  );
};

export default Home;
