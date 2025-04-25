import { PartnerType } from "@/lib/types/entities/partner";

// Type mappings for display
export const transactionTypeMap = {
  cash: {
    name: "Cash",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  transfer: {
    name: "Transfer",
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  },
  qris: {
    name: "Qris",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  },
};

export const transactionStatusMap = {
  success: { name: "Berhasil", color: "bg-success/20 text-success" },
  pending: { name: "Pending", color: "bg-warning/20 text-warning" },
  canceled: { name: "Batal", color: "bg-destructive/20 text-destructive" },
};

export const recordStatusMap = {
  received: { name: "Diterima", color: "bg-blue-100 text-blue-600" },
  processed: { name: "Diproses", color: "bg-amber-100 text-amber-600" },
  shipped: { name: "Dikirim", color: "bg-green-100 text-green-600" },
  canceled: { name: "Dibatalkan", color: "bg-red-100 text-red-600" },
};

export const recordTypeMap = {
  incoming: { name: "Masuk", color: "bg-emerald-100 text-emerald-600" },
  outgoing: { name: "Keluar", color: "bg-violet-100 text-violet-600" },
  processed: { name: "Diproses", color: "bg-amber-100 text-amber-600" },
};


export const partnerTypeMap: Record<
  PartnerType,
  { name: string; color: string }
> = {
  tps: {
    name: "TPS",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  school: {
    name: "Sekolah",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  company: {
    name: "Perusahaan",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  community: {
    name: "Komunitas",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  },
};
