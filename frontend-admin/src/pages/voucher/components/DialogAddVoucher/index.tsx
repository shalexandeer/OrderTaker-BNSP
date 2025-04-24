import { useState } from "react";
import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateVoucher } from "@/services/Voucher/Voucher.query";
import VoucherForm from "@/components/forms/VoucherForm";

export const DialogAddVoucher = () => {
  const [open, setOpen] = useState(false); // State for controlling the dialog
  const queryClient = useQueryClient(); // React Query client

  const voucherMutation = useCreateVoucher({
    onSuccess: () => {
      toast({ title: "Berhasil membuat voucher", style: { backgroundColor: 'green' } });
      setOpen(false); // Close dialog on success
      queryClient.invalidateQueries({ queryKey: ['vouchers'] }); // Invalidate query to refresh voucher list
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createVoucher, isPending } = voucherMutation;

  const handleAddVoucher = (data: VoucherBody) => {
    createVoucher([data]); 
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add New Voucher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Voucher</DialogTitle>
          <DialogDescription>
            Masukkan data untuk membuat voucher baru
          </DialogDescription>
        </DialogHeader>
        <VoucherForm
          onSubmit={handleAddVoucher} // Call the handler when the form is submitted
          isPending={isPending} // Pass loading state
        />
      </DialogContent>
    </Dialog>
  );
};
