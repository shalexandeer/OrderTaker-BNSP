import * as yup from "yup";

export const eventSchema = yup.object().shape({
  name: yup.string().required("Name tidak boleh kosong"),
  image: yup.string().required("Image tidak boleh kosong"),
  description: yup.string().required("Description tidak boleh kosong"),
  shortDescription: yup.string().required("Short description tidak boleh kosong"),
  categoryId: yup.string().required("Category ID tidak boleh kosong"),
  eventDate: yup.string().required("Event date tidak boleh kosong"),
  isActive: yup.boolean().required("IsActive tidak boleh kosong"),
});
