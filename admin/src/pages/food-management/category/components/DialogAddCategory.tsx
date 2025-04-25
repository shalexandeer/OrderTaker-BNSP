import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateCategoryMutation } from "@/services/category/mutations";
import CategoryMutationForm from "./MutationForm";

interface DialogAddCategoryProps {
  children?: React.ReactNode;
}

const DialogAddCategory = ({ children }: DialogAddCategoryProps) => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateCategoryMutation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="default">Add Category</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill out the form below to create a new category.
        </DialogDescription>
        <CategoryMutationForm
          mutationFn={async (data) => {
            await createMutation.mutateAsync(data);
          }}
          onSuccess={() => setOpen(false)}
          submitButtonText="Create Category"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddCategory;
