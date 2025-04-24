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
import { useCreateNewUsername } from "@/services/BlockUsername/BlockUsername.query";
import BlockedUsernameForm from "@/components/forms/BlockedUsernameForm";

export const DialogAddUsername = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const addUsernameMutation = useCreateNewUsername({
    onSuccess: () => {
      toast({ title: "Berhasil membuat referral dengan kode", style: { backgroundColor: 'green' } });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['blocked-usernames'] })
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createNewUsername, isPending } = addUsernameMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Username</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Blocked Username</DialogTitle>
          <DialogDescription>
            Masukkan data untuk menambahkan username yang diblock
          </DialogDescription>
        </DialogHeader>
        <BlockedUsernameForm
          mode='add' // Added mode prop
          onSubmit={(data) => createNewUsername(data)} // wrap createReferral to match SubmitHandler type
          isPending={isPending} // Pass loading state
        />
      </DialogContent>
    </Dialog>
  );
};
