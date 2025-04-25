/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, Key } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Loader2, Plus, Trash } from 'lucide-react';
import { useCustomersForTransaction, useWastePartnersForTransaction, useCreateTransaction } from '@/lib/hooks/transaction';
import {  TransactionType } from '@/lib/types/entities/transaction';
import { cn } from '@/lib/utils';
import { useCurrentPartner } from '@/lib/hooks/waste';

// Form validation schema
const formSchema = z.object({
  nasabah_id: z.string().optional(),
  payment_type: z.string({
    required_error: 'Tipe pembayaran harus dipilih',
  }) as z.ZodType<TransactionType>,
  date: z.date({
    required_error: 'Tanggal harus dipilih',
  }),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      waste_partner_id: z.string({
        required_error: 'Jenis sampah harus dipilih',
      }),
      weight: z.string().min(1, 'Berat harus diisi').refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        { message: 'Berat harus lebih dari 0' }
      ),
    })
  ).min(1, 'Minimal 1 item sampah'),
});

type FormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const TransactionForm = ({ onSuccess, onCancel }: TransactionFormProps) => {
  const [customerSearch, setCustomerSearch] = useState<string>('');
  const [customerOpen, setCustomerOpen] = useState<boolean>(false);
  
  // Fetch current partner (TPS)
  const { data: currentPartner } = useCurrentPartner();
  
  // Fetch customers with search
  const { data: customers = [], isLoading: isLoadingCustomers } = useCustomersForTransaction(customerSearch);
  
  // Fetch waste partners for current TPS
  const { data: wastePartnersData, isLoading: isLoadingWastePartners } = useWastePartnersForTransaction(
    currentPartner?.id || 0
  );
  
  const wastePartners = wastePartnersData?.wastePartners || [];
  const wastesDetails = wastePartnersData?.wastesDetails || [];
  
  // Get create transaction mutation
  const createTransactionMutation = useCreateTransaction();
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nasabah_id: '',
      payment_type: 'cash',
      date: new Date(),
      notes: '',
      items: [{ waste_partner_id: '', weight: '' }],
    },
  });
  
  // Add a new waste item to the form
  const addWasteItem = () => {
    const currentItems = form.getValues('items');
    form.setValue('items', [...currentItems, { waste_partner_id: '', weight: '' }]);
  };
  
  // Remove a waste item from the form
  const removeWasteItem = (index: number) => {
    const currentItems = form.getValues('items');
    if (currentItems.length > 1) {
      form.setValue(
        'items',
        currentItems.filter((_, i) => i !== index)
      );
    }
  };
  
  // Get waste details by ID
  const getWasteDetails = (wastePartnerId: string) => {
    if (!wastePartnerId) return null;
    
    const wastePartner = wastePartners.find((wp: { id: { toString: () => string; }; }) => wp.id.toString() === wastePartnerId);
    if (!wastePartner) return null;
    
    const wasteDetail = wastesDetails.find((w: { id: any; }) => w.id === wastePartner.waste_id);
    if (!wasteDetail) return null;
    
    return {
      name: wasteDetail.name,
      category: wasteDetail.categoryName,
      price: wastePartner.price,
      additional: wastePartner.additional_attribute
    };
  };
  
  // Calculate subtotal for a waste item
  const calculateSubtotal = (wastePartnerId: string, weight: string): number => {
    if (!wastePartnerId || !weight) return 0;
    
    const wastePartner = wastePartners.find((wp: { id: { toString: () => string; }; }) => wp.id.toString() === wastePartnerId);
    if (!wastePartner) return 0;
    
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return 0;
    
    return wastePartner.price * weightNum;
  };
  
  // Calculate total transaction amount
  const calculateTotal = (): number => {
    const items = form.getValues('items');
    return items.reduce((total, item) => {
      return total + calculateSubtotal(item.waste_partner_id, item.weight);
    }, 0);
  };
  
  // Format additional attribute for display
  const formatAdditionalAttribute = (attribute: any): string => {
    if (!attribute) return '';
    if (typeof attribute === 'string') return attribute;
    
    try {
      if (typeof attribute === 'object') {
        if (attribute.condition) return attribute.condition;
        return Object.entries(attribute)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
      }
      return JSON.stringify(attribute);
    } catch (e) {
      return JSON.stringify(attribute);
    }
  };
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    if (!currentPartner) {
      alert('Data TPS tidak ditemukan');
      return;
    }
    
    // Prepare data for API
    const transactionData = {
      nasabah_id: data.nasabah_id || undefined,
      tps_id: currentPartner.id.toString(),
      type: data.payment_type,
      date: format(data.date, 'yyyy-MM-dd'),
      notes: data.notes,
      items: data.items.map(item => ({
        waste_partner_id: parseInt(item.waste_partner_id),
        weight: parseFloat(item.weight)
      }))
    };
    
    createTransactionMutation.mutate(transactionData, {
      onSuccess: onSuccess,
      onError: (error) => {
        console.error('Error creating transaction:', error);
      }
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer selection */}
        <FormField
          control={form.control}
          name="nasabah_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nasabah (opsional)</FormLabel>
              <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={customerOpen}
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? customers.find((customer) => customer.id === field.value)?.name ||
                          "Pilih nasabah"
                        : "Pilih nasabah (opsional)"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Cari nasabah..."
                      className="h-9"
                      value={customerSearch}
                      onValueChange={setCustomerSearch}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {isLoadingCustomers ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Mencari nasabah...</span>
                          </div>
                        ) : (
                          "Tidak ada nasabah yang ditemukan"
                        )}
                      </CommandEmpty>
                      <CommandGroup>
                        {customers.map((customer) => (
                          <CommandItem
                            key={customer.id}
                            value={customer.id}
                            onSelect={() => {
                              form.setValue("nasabah_id", customer.id);
                              setCustomerOpen(false);
                            }}
                          >
                            <div className="flex flex-col">
                              <span>{customer.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {customer.phone}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Type */}
          <FormField
            control={form.control}
            name="payment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Pembayaran <span className="text-destructive">*</span></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe pembayaran" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                    <SelectItem value="qris">QRIS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transaction Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal <span className="text-destructive">*</span></FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd MMMM yyyy")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Catatan tambahan tentang transaksi ini"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Item Sampah</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addWasteItem}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Tambah Item
            </Button>
          </div>

          {form.watch('items').map((_, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Item #{index + 1}</h4>
                {form.watch('items').length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWasteItem(index)}
                    className="h-8 w-8 p-0 text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Waste Type Selection */}
                <FormField
                  control={form.control}
                  name={`items.${index}.waste_partner_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Sampah <span className="text-destructive">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis sampah" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingWastePartners ? (
                            <div className="flex items-center justify-center p-2">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Memuat data...</span>
                            </div>
                          ) : wastePartners.length === 0 ? (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              Tidak ada data sampah
                            </div>
                          ) : (
                            wastePartners.map((wastePartner: { waste_id: any; id: Key | null | undefined; additional_attribute: any; }) => {
                              const waste = wastesDetails.find((w: { id: any; }) => w.id === wastePartner.waste_id);
                              if (!waste) return null;
                              
                              return (
                                <SelectItem 
                                  key={wastePartner.id} 
                                  value={wastePartner?.id?.toString() ?? ""}
                                >
                                  {waste.name} - {formatAdditionalAttribute(wastePartner.additional_attribute)}
                                </SelectItem>
                              );
                            })
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name={`items.${index}.weight`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Berat (kg) <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Masukkan berat"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Display selected waste details */}
              {form.watch(`items.${index}.waste_partner_id`) && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  {(() => {
                    const wasteDetails = getWasteDetails(form.watch(`items.${index}.waste_partner_id`));
                    const weight = form.watch(`items.${index}.weight`);
                    const subtotal = calculateSubtotal(form.watch(`items.${index}.waste_partner_id`), weight);
                    
                    return wasteDetails ? (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Jenis:</span>{" "}
                          <span className="font-medium">{wasteDetails.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Kategori:</span>{" "}
                          <span className="font-medium">{wasteDetails.category}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Harga per kg:</span>{" "}
                          <span className="font-medium">Rp {wasteDetails.price.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Subtotal:</span>{" "}
                          <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Data sampah tidak ditemukan</div>
                    );
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-xl font-semibold">
              Rp {calculateTotal().toLocaleString()}
            </span>
          </div>
        </div>

        {/* Form actions */}
        <div className="flex justify-end space-x-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={createTransactionMutation.isPending}
          >
            Batal
          </Button>
          <Button 
            type="submit"
            disabled={createTransactionMutation.isPending}
          >
            {createTransactionMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Transaksi"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};