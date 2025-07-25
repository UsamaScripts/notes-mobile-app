import React from "react";
import { View } from "react-native";

function BgCircle() {
  return (
    <>
      <View className="absolute w-48 h-48 bg-white/10 rounded-full -top-16 -right-16" />
      <View className="absolute w-56 h-56 border border-white/10 rounded-full -top-20 -right-20" />
      <View className="absolute w-20 h-20 bg-white/10 rounded-full top-16 left-16" />
      <View className="absolute w-48 h-48 bg-white/10 rounded-full -bottom-16 -left-16" />
      <View className="absolute w-56 h-56 border border-white/10 rounded-full -bottom-20 -left-20" />
      <View className="absolute w-48 h-48 bg-white/10 rounded-full top-1/2 right-24 -translate-y-1/2" />
      <View className="absolute w-56 h-56 border border-white/10 rounded-full top-1/2 right-20 -translate-y-1/2" />
    </>
  );
}

export default BgCircle;
