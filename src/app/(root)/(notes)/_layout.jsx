import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="note-list-screen" options={{ headerShown: false }} />
      <Stack.Screen name="note-detail-screen" options={{ headerShown: false }} />
      <Stack.Screen name="add-note-screen" options={{ headerShown: false }} />
      <Stack.Screen name="edit-note-screen" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
