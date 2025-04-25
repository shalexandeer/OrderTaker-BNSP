import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdditionalMutationForm from "./AdditionalMutationForm";
import { useState } from "react";
import {
  Additional,
  AdditionalUpdatePayload,
} from "@/services/additional/types";
import { useUpdateAdditionalMutation } from "@/services/additional/mutations";
import { toast } from "react-toastify";
import { DialogDescription } from "@radix-ui/react-dialog";

interface DialogEditAdditionalProps {
  additional: Additional;
  children: React.ReactNode;
}

const DialogEditAdditional = ({
  additional,
  children,
}: DialogEditAdditionalProps) => {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateAdditionalMutation();

  const handleSubmit = async (data: AdditionalUpdatePayload) => {
    try {
      await updateMutation.mutateAsync({ id: additional.id, ...data });
      setOpen(false);
      toast.success("Additional updated successfully!");
    } catch (error) {
      console.error("Error creating food:", error);
      toast.error("Failed to create food. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Additional: {additional.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update the details of the additional below.
        </DialogDescription>
        <AdditionalMutationForm
          defaultValues={{
            name: additional.name,
            price: additional.price,
          }}
          submitButtonText="Save Changes"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditAdditional;
