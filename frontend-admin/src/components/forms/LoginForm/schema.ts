import * as yup from "yup";

export const loginSchema = yup
  .object({
    username: yup.string().required("Email tidak boleh kosong"),
    password: yup.string().required("Password tidak boleh kosong"),
  })
  .required();
