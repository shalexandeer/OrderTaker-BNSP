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
import ClientUrlForm from "@/components/forms/ClientUrlForm";
import { useCreateGameClient } from "@/services/ClientUrl/ClientUrl.query";

export const DialogAddClientUrl= () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const gameClientMutation = useCreateGameClient({
    onSuccess: ({message}) => {
      toast({ title: message , style: { backgroundColor: 'green' } });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['game-clients'] })
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createEvent, isPending } = gameClientMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Game Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Add Game Client</DialogTitle>
          <DialogDescription>
            Masukkan data untuk menambahkan Game Client
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          <ClientUrlForm
            onSubmit={(data) => createEvent(data)} // wrap createEventto match SubmitHandler type
            isPending={isPending} // Pass loading state
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
