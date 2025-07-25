import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { router } from "expo-router";
import { Button } from "../../components/Button";
import { TextInputField } from "../../components/TextInputField";
import { Formik } from "formik";
import { LoginSchema } from "../../validation/loginSchema";
import { useLoginUserMutation } from "@/service/authApi";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, setToken } from "@/features/authSlice";

export default function SignIn() {
  const [isSecure, setIsSecure] = useState(true);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    try {
      console.log("Login Request:", values);
      const result = await loginUser(values).unwrap();
      console.log("Login Response:", result);

      if (result?.token) {
        dispatch(setUser(result.user || {}));
        dispatch(setToken(result.token));
        dispatch(setIsLoggedIn(true));

        Toast.show({
          type: "success",
          text1: "Login Successful",
          position: "bottom",
        });

        router.replace("/(root)/(notes)/note-list-screen");
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Invalid credentials",
          position: "bottom",
        });
      }
    } catch (error) {
      console.log("Login Error:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.data?.message || "Something went wrong!",
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          padding: 16,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleFormSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* Email */}
                <TextInputField
                  label="Email"
                  placeholder="Enter your email"
                  value={values.email}
                  iconName="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}

                {/* Password */}
                <TextInputField
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  secureToggle
                  iconName="locked"
                  isSecure={isSecure}
                  setIsSecure={setIsSecure}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}

                {/* Submit Button */}
                <View className="mt-6">
                  <Button
                    onPress={handleSubmit}
                    text="Login"
                    containerClass="bg-primary w-full"
                    textClass="text-white"
                    loading={isLoading}
                    disabled={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}