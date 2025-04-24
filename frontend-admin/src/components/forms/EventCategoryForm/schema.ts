import * as yup from "yup";

export const eventSchema = yup.object().shape({
  name: yup.string().required("Name tidak boleh kosong"),
});
