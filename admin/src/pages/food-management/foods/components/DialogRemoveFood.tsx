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
import { useDeleteFoodMutation } from "@/services/food/mutations";
import { Food } from "@/services/food/types";

interface DialogRemoveFoodProps {
  food: Food;
  children: React.ReactNode;
}

const DialogRemoveFood = ({ food, children }: DialogRemoveFoodProps) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteFoodMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(food.id);
      toast({
        title: "Success",
        description: `Food "${food.name}" deleted successfully`,
      });
      setOpen(false);
    } catch (error) {
      const errorMessage =
        (error as any)?.response?.data?.message || "Failed to delete food";
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
          <DialogTitle>Delete Food: {food.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this food? This action cannot be
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

export default DialogRemoveFood;
