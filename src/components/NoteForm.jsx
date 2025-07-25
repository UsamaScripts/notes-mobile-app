import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "./FormField";

const NoteSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const NoteForm = ({ initialValues, onSubmit, buttonLabel }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View className="p-4">
          <FormField
            label="Title"
            placeholder="Enter note title"
            value={values.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            error={touched.title && errors.title}
          />

          <FormField
            label="Content"
            placeholder="Enter note content"
            value={values.content}
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            error={touched.content && errors.content}
            multiline
          />

          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {buttonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default NoteForm;