import { useState } from "react";
import { Button } from "@/components/custom/button";
import ReferralForm from "@/components/forms/ReferralForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useCreateReferralCode } from "@/services/Referral/Referral.query";
import { useQueryClient } from "@tanstack/react-query";

export const DialogAddReferral = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const referralMutation = useCreateReferralCode({
    onSuccess: () => {
      toast({ title: "Berhasil membuat referral dengan kode", style: { backgroundColor: 'green' } });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['referrals'] })
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createReferral, isPending } = referralMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Referral</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Referral</DialogTitle>
          <DialogDescription>
            Masukkan data untuk membuat referral baru
          </DialogDescription>
        </DialogHeader>
        <ReferralForm
          onSubmit={(data) => createReferral(data)} // wrap createReferral to match SubmitHandler type
          isPending={isPending} // Pass loading state
        />
      </DialogContent>
    </Dialog>
  );
};
