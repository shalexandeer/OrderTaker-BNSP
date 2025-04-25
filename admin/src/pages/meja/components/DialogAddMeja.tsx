import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MejaMutationForm from "./MutationForm";
import { useCreateMejaMutation } from "@/services/meja/mutations";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DialogAddMejaProps {
  children?: React.ReactNode;
}

const DialogAddMeja = ({ children }: DialogAddMejaProps) => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateMejaMutation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="default">Add Table</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Table</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You can create a new table here. Make sure to fill in all required
        </DialogDescription>
        <MejaMutationForm
          mutationFn={async (data) => {
            await createMutation.mutateAsync(data);
          }}
          onSuccess={() => setOpen(false)}
          submitButtonText="Create Table"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddMeja;
