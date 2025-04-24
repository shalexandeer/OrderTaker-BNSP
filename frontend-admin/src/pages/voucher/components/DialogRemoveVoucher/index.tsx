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
import { useDeleteVoucher } from "@/services/Voucher/Voucher.query";
import { tableEditorState } from "@/store/table_recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export function DialogRemoveVoucher() {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();
  
  const voucherMutation = useDeleteVoucher({
    onSuccess: () => {
      toast({ title: "Berhasil menghapus voucher", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedItem: {id: '', name: ''} }));
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });
  
  const { mutate: deleteReferral, isPending } = voucherMutation;
  const handleDelete = () => {
    deleteReferral(table.selectedItem.id);
  };
  const handleClose = () => {
    setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedItem: {id: '', name: ''} }));
  }

  return (
    <Dialog open={table.isDeleting} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedId: '' }))}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hapus Voucher {table.selectedItem.name}</DialogTitle>
          <DialogDescription>
            Dengan menekan tombol "Hapus", data referral dengan ID {table.selectedItem.name} akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} onClick={handleClose} >
            Cancel
          </Button>
          <Button type="submit" variant={'destructive'} disabled={isPending} loading={isPending} onClick={handleDelete}>
            {isPending ? (
              'Loading...'
            ) : (
              'Hapus Data'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
