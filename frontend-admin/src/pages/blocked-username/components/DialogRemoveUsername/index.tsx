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
import { useDeleteUsername } from "@/services/BlockUsername/BlockUsername.query";
import { tableEditorState } from "@/store/table_recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export function DialogRemoveUsername() {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();
  
  const blockedUsernameMutation = useDeleteUsername({
    onSuccess: () => {
      toast({ title: "Berhasil menghapus username", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedItem: {id: '', name: ''} }));
      queryClient.invalidateQueries({ queryKey: ['blocked-usernames'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });
  
  const { mutate: deleteUsername, isPending } = blockedUsernameMutation;
  const handleDelete = () => {
    deleteUsername(table.selectedItem.id);
  };

  return (
    <Dialog open={table.isDeleting} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedId: '' }))}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hapus username {table.selectedItem.name}</DialogTitle>
          <DialogDescription>
            Dengan menekan tombol "Hapus", blocked username <strong>{table.selectedItem.name}</strong> akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"outline"} >
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
