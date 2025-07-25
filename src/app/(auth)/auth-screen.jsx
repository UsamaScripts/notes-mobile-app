import React, { useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { ICONS } from "../../../assets/constants";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import BgCircle from "../../components/bg-circle";
import { AuthScreenButton } from "../../constents/constant";
export default function AuthScreen() {
  return (
    <View className="flex-1 bg-primary relative">
      <SafeAreaView className="flex-1 relative">
        <BgCircle />
        <View className="flex-1 justify-between items-center space-y-8 px-4 py-8">
          <View></View>
          <Image
            source={ICONS.auth}
            className="w-3/4 max-h-[300px]"
            resizeMode="contain"
          />
          <View className="w-full max-w-md rounded-2xl bg-white p-4 items-center">
            <Text className="text-3xl font-semibold">Login or Sign Up</Text>
            <Text className="text-base text-gray-400 font-semibold text-center px-8 my-2">
              Login or create an account to take the manage your notes.
            </Text>
            <View className="w-full gap-3 justify-center items-center">
              {AuthScreenButton.map((btn, index) => (
                <Button
                  key={index}
                  onPress={() => router.push(btn.route)}
                  text={btn.text}
                  icon=""
                  containerClass={btn.containerClass}
                  textClass={btn.textClass}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
