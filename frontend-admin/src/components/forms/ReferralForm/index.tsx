import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { referralSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { SelectUserPopUp } from "@/pages/referral/components/SelectUserPopUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface ReferralFormProps {
  onSubmit: SubmitHandler<ReferralCodeBody>; // Keep SubmitHandler type
  isPending: boolean;
  loadingReferral?: boolean;
  defaultValues?: Partial<ReferralCodeBody>; // Optional default values for editing
}

const ReferralForm: React.FC<ReferralFormProps> = ({
  onSubmit,
  isPending,
  // loadingReferral,
  defaultValues,
}) => {
  const form = useForm<ReferralCodeBody>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      id: '',
      referralCode: '',
      referralReceiveRate: 0,
      referralSendRate: 0,
      ...defaultValues, // Spread default values if provided (for edit mode)
    },
  });

  const referralCode = form.watch('referralCode');
  const referralReceiveRate = form.watch('referralReceiveRate');
  const referralSendRate = form.watch('referralSendRate');

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        id: defaultValues.id || '',
        referralCode: defaultValues.referralCode || '',
        referralReceiveRate: defaultValues.referralReceiveRate || 0,
        referralSendRate: defaultValues.referralSendRate || 0,
      });
    }
  }, [defaultValues, form.reset, form]);

  // Ensure the inputs accept only numbers (including decimal) but are of type text
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to allow numbers, decimals, and empty string
    if (/^\d*\.?\d*$/.test(value)) {
      form.setValue(
        e.target.name as keyof ReferralCodeBody,
        parseFloat(value) || 0,
        { shouldDirty: true } // Set shouldDirty to true to track changes
      );
    }
  };

  // Button will be disabled when the form is not dirty, pending, or incomplete
  const isDisabled =
    !form.formState.isDirty || // Fix: isDirty should now update correctly
    isPending ||
    referralReceiveRate === 0 ||
    referralSendRate === 0 ||
    referralCode === '';

  const handleUserSelection = (user: { id: string; username: string }) => {
    form.setValue('id', user.id, { shouldDirty: true }); // Mark as dirty when user is selected
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* User Selector */}
        <SelectUserPopUp
          selectedUser={{ username: defaultValues?.username ?? '' }}
          setSelectedUser={handleUserSelection}
        />
        
        {/* Referral Code Field */}
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Referral Code <span className="text-xs">(ex: salek)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Referral Code..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Receive Rate Field */}
        <FormField
          control={form.control}
          name="referralReceiveRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receive Rate</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan Receive Rate..."
                  {...field}
                  value={field.value || ''}
                  onChange={handleNumberInput} // Custom onChange to restrict input to numbers
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Send Rate Field */}
        <FormField
          control={form.control}
          name="referralSendRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Send Rate</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan Send Rate..."
                  {...field}
                  value={field.value || ''}
                  onChange={handleNumberInput} // Custom onChange to restrict input to numbers
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={isDisabled} loading={isPending}>
          {!defaultValues ? 'Buat Referral' : 'Update Referral'}
        </Button>
      </form>
    </Form>
  );
};

export default ReferralForm;
