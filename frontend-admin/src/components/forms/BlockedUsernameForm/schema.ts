import * as yup from "yup";

export const blockedUsernameSchema = yup.object().shape({
  username: yup.string()
    .required("Username tidak boleh kosong")
    .max(16, "Username tidak boleh lebih dari 16 karakter")
    .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Username harus dimulai dengan huruf dan tidak boleh mengandung simbol atau spasi"),
});
