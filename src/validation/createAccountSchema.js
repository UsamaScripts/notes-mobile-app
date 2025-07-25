import * as Yup from "yup";

export const createAccount = Yup.object({
  name: Yup.string()
    .min(3, "name must be at least 3 characters")
    .required("name is required"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
