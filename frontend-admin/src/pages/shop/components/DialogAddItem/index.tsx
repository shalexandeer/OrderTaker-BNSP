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
import ItemMallForm from "@/components/forms/ItemMallForm";
import { useCreateItemMall } from "@/services/Shop/Shop.query";

export const DialogAddItem = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const itemMallMutation = useCreateItemMall({
    onSuccess: () => {
      toast({ title: "Berhasil membuat item mall", style: { backgroundColor: 'green' } });
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['item-mall'] })
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: createItemMall, isPending } = itemMallMutation;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Item Mall</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Add Item Mall</DialogTitle>
          <DialogDescription>
            Masukkan data untuk membuat item baru
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1">
          <ItemMallForm
            onSubmit={(data) => createItemMall(data)}
            isPending={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
