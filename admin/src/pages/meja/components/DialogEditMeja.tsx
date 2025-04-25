import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MejaMutationForm from "./MutationForm";
import { useUpdateMejaMutation } from "@/services/meja/mutations";
import { useState } from "react";
import { Meja } from "@/services/meja/types";

interface DialogEditMejaProps {
  meja: Meja;
  children?: React.ReactNode;
}

const DialogEditMeja = ({ meja, children }: DialogEditMejaProps) => {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateMejaMutation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="secondary">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Table: {meja.number}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You can edit the table details here. Make sure to fill in all required
          fields.
        </DialogDescription>
        <MejaMutationForm
          defaultValues={{
            number: meja.number,
            capacity: meja.capacity,
            status: meja.status,
            location: meja.location,
          }}
          mutationFn={async (data) => {
            await updateMutation.mutateAsync({ id: meja.id, ...data });
          }}
          onSuccess={() => setOpen(false)}
          submitButtonText="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditMeja;
