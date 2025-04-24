import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useDeleteItemMall } from "@/services/Shop/Shop.query";
import { tableEditorState } from "@/store/table_recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export function DialogRemoveItem() {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();
  
  const itemMallMutation = useDeleteItemMall({
    onSuccess: () => {
      toast({ title: "Berhasil menghapus item mall", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedItem: {id: '', name: ''} }));
      queryClient.invalidateQueries({ queryKey: ['item-mall'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });
  
  const { mutate: deleteItem, isPending } = itemMallMutation;
  const handleDelete = () => {
    deleteItem(table.selectedItem.id);
  };

  return (
    <Dialog open={table.isDeleting} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedId: '' }))}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hapus Item {table.selectedItem.name}</DialogTitle>
          <DialogDescription>
            Dengan menekan tombol "Hapus", {table.selectedItem.name} akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" variant={'destructive'} disabled={isPending} loading={isPending} onClick={handleDelete}>
            {isPending ? (
              'Loading...'
            ) : (
              'Hapus Item'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
