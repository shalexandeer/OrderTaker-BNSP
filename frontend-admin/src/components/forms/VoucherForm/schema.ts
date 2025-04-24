import { z } from "zod";

export const voucherSchema = z.object({
  voucherName: z.string().nonempty("Voucher name tidak boleh kosong"),
  pointValue: z.number().nonnegative("Point value tidak boleh kosong"),
  pointPrice: z.number().nonnegative("Point price tidak boleh kosong"),
});
