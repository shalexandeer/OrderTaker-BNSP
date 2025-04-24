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
import ItemMallForm from "@/components/forms/ItemMallForm";
import { useGetItemMallById, useUpdateItemMall } from "@/services/Shop/Shop.query";

export const DialogEditItem = () => {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();

  const {data: itemMallData, isLoading: loadingItemMall} = useGetItemMallById(table?.selectedItem?.id, table.selectedItem?.id !== null && table.selectedItem?.id !== undefined && table.selectedItem?.id !== "" && table.isEditing);

  const itemMallMutation = useUpdateItemMall({
    onSuccess: () => {
      toast({ title: "Berhasil update item mall", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''}  }));
      queryClient.invalidateQueries({ queryKey: ['item-mall'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateItemMall, isPending } = itemMallMutation;

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Ubah dan perbarui data Item Mall
          </DialogDescription>
        </DialogHeader>
        
        {/* Pass the updateReferral function, defaultValues, and mode="edit" */}
        <div className="overflow-y-auto flex-1">
          <ItemMallForm
            onSubmit={(data) => updateItemMall({ data, id: table.selectedItem.id })}
            isPending={isPending}
            isLoading={loadingItemMall}
            defaultValues={itemMallData?.data} // Prefill form with the selected referral data
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
