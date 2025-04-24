import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { tableEditorState } from "@/store/table_recoil";
import ClientUrlForm from "@/components/forms/ClientUrlForm";
import { useUpdateGameClient } from "@/services/ClientUrl/ClientUrl.query";

interface DialogClientUrlProps {
  clientUrlData: ClientUrlBody[];
}

export const DialogEditClientUrl = ({clientUrlData}: DialogClientUrlProps) => {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();

  const updateMutation = useUpdateGameClient({
    onSuccess: ({message}) => {
      toast({ title: message, style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''}  }));
      queryClient.invalidateQueries({ queryKey: ['game-clients'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateGameClient, isPending } = updateMutation;

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Edit Game Client</DialogTitle>
          <DialogDescription>
            Ubah dan perbarui data Game Client
          </DialogDescription>
        </DialogHeader>
        
        {/* Pass the updateevent function, defaultValues, and mode="edit" */}
        <div className="overflow-y-auto flex-1">
          <ClientUrlForm
            onSubmit={(data) => updateGameClient(data)}
            isPending={isPending}
            defaultValues={clientUrlData?.find((data) => data.id === table?.selectedItem?.id)} // Prefill form with the selected event data
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
