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
import { useGetVoucherById, useUpdateVoucher } from "@/services/Voucher/Voucher.query";
import VoucherForm from "@/components/forms/VoucherForm";

export const DialogEditVoucher = () => {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();

  const {data: voucherData} = useGetVoucherById(table?.selectedItem?.id, table.selectedItem?.id !== null && table.selectedItem?.id !== undefined && table.selectedItem?.id !== "" && table.isEditing);

  const voucherMutation = useUpdateVoucher({
    onSuccess: () => {
      toast({ title: "Berhasil update voucher", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''}  }));
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateVoucher, isPending } = voucherMutation;

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Vouchers</DialogTitle>
          <DialogDescription>
            Ubah dan perbarui data referral
          </DialogDescription>
        </DialogHeader>
        
        {/* Pass the updateReferral function, defaultValues, and mode="edit" */}
        <VoucherForm
          onSubmit={(data) => updateVoucher({
            id: table.selectedItem.id,
            ...data
          })}
          isPending={isPending} // Pass loading state
          // @ts-expect-error: voucherData might be undefined
          defaultValues={voucherData?.data}
        />
      </DialogContent>
    </Dialog>
  );
};
