import { View, ActivityIndicator } from "react-native";

const Loader = ({ large }) => {
  return large ? (
    <View className="flex-1 justify-center items-center bg-secondary-light rounded-2xl p-5">
      <ActivityIndicator size="large" color="#695AE0" />
    </View>
  ) : (
    <ActivityIndicator size="small" color="#695AE0" />
  );
};

export default Loader;
