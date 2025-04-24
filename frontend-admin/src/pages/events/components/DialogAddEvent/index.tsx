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
import { useCreateEvent } from "@/services/Events/Events.query";
import EventForm from "@/components/forms/EventForm";

export const DialogAddEvent= () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const eventMutation = useCreateEvent({
    onSuccess: ({message}) => {
      toast({ title: message , style: { backgroundColor: 'green' } });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createEvent, isPending } = eventMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Masukkan data untuk membuat Event baru
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          <EventForm
            onSubmit={(data) => createEvent(data)} // wrap createEventto match SubmitHandler type
            isPending={isPending} // Pass loading state
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
