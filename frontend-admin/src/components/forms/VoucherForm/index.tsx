import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { voucherSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

interface VoucherFormProps {
  onSubmit: SubmitHandler<VoucherBody>; // Keep SubmitHandler type
  isPending: boolean;
  loadingReferral?: boolean;
  defaultValues?: Partial<VoucherBody>; // Optional default values for editing
}

const VoucherForm: React.FC<VoucherFormProps> = ({
  onSubmit,
  isPending,
  defaultValues,
}) => {
  const form = useForm<VoucherBody>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      voucherName: '',
      pointPrice: 0,
      pointValue: 0,
      ...defaultValues, // Spread default values if provided (for edit mode)
    },
  });

  const voucherName = form.watch('voucherName');
  const pointPrice = form.watch('pointPrice');
  const pointValue = form.watch('pointValue');

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        voucherName: defaultValues.voucherName || '',
        pointPrice: defaultValues.pointPrice || 0,
        pointValue: defaultValues.pointValue || 0,
      });
    }
  }, [defaultValues, form.reset, form]);

  // Ensure the inputs accept only numbers (including decimal) but are of type text
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to allow numbers, decimals, and empty string
    if (/^\d*\.?\d*$/.test(value)) {
      form.setValue(
        e.target.name as keyof VoucherBody,
        parseFloat(value) || 0,
        { shouldDirty: true } // Set shouldDirty to true to track changes
      );
    }
  };

  // Button will be disabled when the form is not dirty, pending, or incomplete
  const isDisabled =
    !form.formState.isDirty || // Fix: isDirty should now update correctly
    isPending ||
    pointPrice === 0 ||
    pointValue === 0 ||
    voucherName === '';

 
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Voucher Name Field */}
        <FormField
          control={form.control}
          name="voucherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Voucher Name <span className="text-xs">(ex: salek)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Voucher Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Receive Value Field */}
        <FormField
          control={form.control}
          name="pointValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Point Value</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan Point Value..."
                  {...field}
                  value={field.value || ''}
                  onChange={handleNumberInput} // Custom onChange to restrict input to numbers
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Point Price Field */}
        <FormField
          control={form.control}
          name="pointPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Point Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukkan Point Price..."
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
          {!defaultValues ? 'Buat Voucher' : 'Update Voucher'}
        </Button>
      </form>
    </Form>
  );
};

export default VoucherForm;
