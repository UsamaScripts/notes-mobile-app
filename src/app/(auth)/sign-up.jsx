import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Button } from "../../components/Button";
import { createAccount } from "../../validation/createAccountSchema";
import { Formik } from "formik";
import Header from "../../components/Header";
import { useRegisterUserMutation } from "@/service/authApi";
import { TextInputField } from "../../components/TextInputField";
import Toast from "react-native-toast-message";

export default function EmailSignUp() {
  const [isSecure, setIsSecure] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleFormSubmit = async (values) => {
    try {
      setErrorMsg("");
      const response = await registerUser(values).unwrap();

      Toast.show({
        type: "success",
        text1: "Account Created",
        text2: "Please login to continue",
        position: "bottom",
      });

      router.push("/(auth)/sign-in");
    } catch (error) {
      const message = error?.data?.message || "Something went wrong!";
      setErrorMsg(message);

      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: message,
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-light mt-12">
      <Header title="Create Account" />
      <ScrollView>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View className="flex-1 px-4 pt-4">
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={createAccount}
              onSubmit={handleFormSubmit}
              validateOnChange={true} 
              validateOnBlur={true}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                touched,
                values,
                errors,
              }) => (
                <>
                  <TextInputField
                    label="Name"
                    placeholder="Enter your Name"
                    iconName="person"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                  />
                  {touched.name && errors.name && (
                    <Text className="text-red-500 text-sm mt-1">{errors.name}</Text>
                  )}

                  <TextInputField
                    label="Email"
                    placeholder="Enter your email"
                    iconName="email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                  )}

                  <TextInputField
                    label="Password"
                    iconName="locked"
                    placeholder="Your Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureToggle
                    isSecure={isSecure}
                    setIsSecure={setIsSecure}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-sm mt-1">{errors.password}</Text>
                  )}

                  {errorMsg ? (
                    <Text className="text-red-500 mt-2">{errorMsg}</Text>
                  ) : null}

                  <View className="px-4 pb-4 mt-4">
                    <Button
                      onPress={handleSubmit}
                      containerClass="w-full bg-primary"
                      textClass="text-white"
                      text="Sign Up"
                      loading={isLoading}
                      disabled={isLoading}
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}