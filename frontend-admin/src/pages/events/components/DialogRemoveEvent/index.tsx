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
import { useDeleteEvent } from "@/services/Events/Events.query";
import { tableEditorState } from "@/store/table_recoil";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export function DialogRemoveEvent() {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();
  
  const deleteMutation = useDeleteEvent({
    onSuccess: ({message}) => {
      toast({ title: message, style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedItem: {id: '', name: ''} }));
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });
  
  const { mutate: deleteEvent, isPending } = deleteMutation;
  const handleDelete = () => {
    deleteEvent(table.selectedItem.id);
  };

  return (
    <Dialog open={table.isDeleting} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isDeleting: false, selectedId: '' }))}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hapus Event {table.selectedItem.name}</DialogTitle>
          <DialogDescription>
            Dengan menekan tombol "Hapus", data event dengan nama {table.selectedItem.name} akan dihapus secara permanen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
