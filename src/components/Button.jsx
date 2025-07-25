import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import Loader from "./loader"; 

export function Button({
  onPress,
  text,
  icon,
  containerClass = "",
  textClass = "",
  iconStyle = { width: 20, height: 20 },
  loading = false,
  ...props
}) {
  const showIcon = Boolean(icon) && icon !== "";

  return (
    <TouchableOpacity
      onPress={loading ? null : onPress}
      activeOpacity={0.7}
      className={`flex-row items-center justify-center w-11/12 rounded-3xl p-4 border border-gray-300 ${containerClass} ${loading ? "opacity-50" : ""}`}
      {...props}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {showIcon && (
            <Image source={icon} style={iconStyle} resizeMode="contain" />
          )}
          <Text className={`ml-2 font-medium text-base ${textClass}`}>
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
