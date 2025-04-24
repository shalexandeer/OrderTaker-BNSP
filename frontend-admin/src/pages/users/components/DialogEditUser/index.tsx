import ReferralForm from "@/components/forms/ReferralForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useGetReferralById, useUpdateReferral } from "@/services/Referral/Referral.query";
import { useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { tableEditorState } from "@/store/table_recoil";

export const DialogEditUser = () => {
  const [table, setTable] = useRecoilState(tableEditorState);
  const queryClient = useQueryClient();

  const {data: referralData, isLoading: loadingReferral} = useGetReferralById(table?.selectedItem?.id, table.selectedItem?.id !== null && table.selectedItem?.id !== undefined && table.selectedItem?.id !== "" && table.isEditing);

  const referralMutation = useUpdateReferral({
    onSuccess: () => {
      toast({ title: "Berhasil update referral", style: { backgroundColor: 'green' } });
      setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''}  }));
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: 'red' } });
    },
  });

  const { mutate: updateReferral, isPending } = referralMutation;

  return (
    <Dialog open={table.isEditing} onOpenChange={() => setTable((prevTable) => ({ ...prevTable, isEditing: false, selectedItem: {id: '', name: ''} }))}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Referral</DialogTitle>
          <DialogDescription>
            Ubah dan perbarui data referral
          </DialogDescription>
        </DialogHeader>
        
        {/* Pass the updateReferral function, defaultValues, and mode="edit" */}
        <ReferralForm
          onSubmit={(data) => updateReferral(data)}
          isPending={isPending}
          loadingReferral={loadingReferral}
          defaultValues={referralData?.data} // Prefill form with the selected referral data
        />
      </DialogContent>
    </Dialog>
  );
};
