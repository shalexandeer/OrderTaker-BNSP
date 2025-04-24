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
import { useGetEventById, useUpdateEvent } from "@/services/Events/Events.query";
import EventForm from "@/components/forms/EventForm";

export const DialogEditEvent = () => {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();

  const {data: eventData, isLoading: loadingEvent} = useGetEventById(table?.selectedItem?.id, table.selectedItem?.id !== null && table.selectedItem?.id !== undefined && table.selectedItem?.id !== "" && table.isEditing);

  const eventMutation = useUpdateEvent({
    onSuccess: ({message}) => {
      toast({ title: message, style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''}  }));
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateevent, isPending } = eventMutation;

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Ubah dan perbarui data event
          </DialogDescription>
        </DialogHeader>
        
        {/* Pass the updateevent function, defaultValues, and mode="edit" */}
        <div className="overflow-y-auto flex-1">
          <EventForm
            onSubmit={(data) => updateevent(data)}
            isPending={isPending}
            loadingEvent={loadingEvent}
            defaultValues={eventData?.data} // Prefill form with the selected event data
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
