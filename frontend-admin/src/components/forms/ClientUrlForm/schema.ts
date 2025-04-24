import * as yup from "yup";

export const clientUrlSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  image: yup.string().required("Image is required"),
  url: yup.string().required("Url is Required"),
});