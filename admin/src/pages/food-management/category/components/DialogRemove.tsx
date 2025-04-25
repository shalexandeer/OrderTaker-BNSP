/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Category } from "@/services/category/types";
import { useDeleteCategoryMutation } from "@/services/category/mutations";

interface DialogRemoveCategoryProps {
  category: Category;
  children: React.ReactNode;
}

const DialogRemoveCategory = ({
  category,
  children,
}: DialogRemoveCategoryProps) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(category.id);
      toast({
        title: "Success",
        description: `Category "${category.name}" deleted successfully`,
      });
      setOpen(false);
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "Failed to delete category";
      const errorDescription =
        (error as any)?.response?.data?.data || "Check server logs for details";

      toast({
        variant: "destructive",
        title: errorMessage,
        description: errorDescription,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Category: {category.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending && (
              <span className="animate-spin mr-2">...</span>
            )}
            Confirm Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemoveCategory;
