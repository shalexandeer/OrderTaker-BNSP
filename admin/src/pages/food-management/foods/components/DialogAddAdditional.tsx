import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AdditionalMutationForm from "./AdditionalMutationForm";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useCreateAdditionalMutation } from "@/services/additional/mutations";
import { toast } from "react-toastify";

interface DialogAddAdditionalProps {
  foodId: string;
  children?: React.ReactNode;
}

const DialogAddAdditional = ({
  foodId,
  children,
}: DialogAddAdditionalProps) => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateAdditionalMutation();

  const handleSubmit = async (data: { name: string; price: number }) => {
    try {
      await createMutation.mutateAsync({ ...data, foodId });
      setOpen(false);
      toast.success("Additional added successfully!");
    } catch (error) {
      console.error("Error creating food:", error);
      toast.error("Failed to create food. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <PlusIcon className="mr-2" />
            Add Additional
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Additional</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the form below to create a new additional item.
        </DialogDescription>
        <AdditionalMutationForm
          submitButtonText="Create Additional"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddAdditional;
