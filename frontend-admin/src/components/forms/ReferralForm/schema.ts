import { z } from "zod";

export const referralSchema = z.object({
  id: z.string().nonempty("ID tidak boleh kosong"),
  referralCode: z.string().nonempty("Kode referral tidak boleh kosong"),
  referralSendRate: z.number().nonnegative("Refferal send rate tidak boleh kosong"),
  referralReceiveRate: z.number().nonnegative("Refferal receive rate tidak boleh kosong"),
});
