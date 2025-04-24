import * as yup from "yup";

export const itemMallSchema = yup
  .object({
    itemId: yup.number().min(1, "Item ID must be greater than 0").required("Item ID is required"),
    itemName: yup.string().required("Item name is required"),
    itemImage: yup.string().required("Item image is required"),
    itemDescription: yup.string().required("Item description is required"),
    itemQuantity: yup.number().min(1, "Item quantity must be greater than 0").required("Item quantity is required"),
    streamerPrice: yup.number().min(1, "Streamer price must be greater than 0").required("Streamer price is required"),
    cashCoinPrice: yup.number().min(1, "Cash coin price must be greater than 0").required("Cash coin price is required"),
    stock: yup.number().min(1, "Stock must be greater than 0").required("Stock is required"),
    sold: yup.number().min(0, "Sold amount cannot be negative").required("Sold amount is required"),
    isPermanent: yup.boolean().required("Permanent status is required"),
    isOnSale: yup.boolean().required("Sale status is required"),
    durationTimeInMinutes: yup.number().required("Duration time is required"),
    itemMallCategories: yup.array().of(
      yup.object({
        id: yup.number().min(0, "Category ID must be 0 or greater").required("Category ID is required")
      })
    ).required("Categories are required")
  })
  .required();
