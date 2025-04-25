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
import { Category } from "@/services/category/types";
import { useUpdateCategoryMutation } from "@/services/category/mutations";
import CategoryMutationForm from "./MutationForm";

interface DialogEditCategoryProps {
  category: Category;
  children?: React.ReactNode;
}

const DialogEditCategory = ({
  category,
  children,
}: DialogEditCategoryProps) => {
  const [open, setOpen] = useState(false);
  const updateMutation = useUpdateCategoryMutation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="secondary">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category: {category.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update the details of the category below.
        </DialogDescription>
        <CategoryMutationForm
          defaultValues={{
            name: category.name,
            img: category.img,
          }}
          mutationFn={async (data) => {
            await updateMutation.mutateAsync({ id: category.id, ...data });
          }}
          onSuccess={() => setOpen(false)}
          submitButtonText="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditCategory;
