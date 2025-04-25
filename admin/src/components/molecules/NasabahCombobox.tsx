import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useCustomersForTransaction } from "@/lib/hooks/transaction";
import { Controller, useFormContext } from "react-hook-form";

interface NasabahComboboxProps {
  name?: string;
}

export const NasabahCombobox = ({ name = "nasabah_id" }: NasabahComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const { data: customers = [] } = useCustomersForTransaction(searchValue);
  const { control, formState: { errors } } = useFormContext();
  
  const errorMessage = name && errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>Pilih Nasabah</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-full justify-between",
                  errorMessage ? "border-destructive" : ""
                )}
                onClick={(e) => e.preventDefault()}
              >
                {field.value
                  ? customers.find((customer) => customer.id === field.value)?.name || "Pilih nasabah"
                  : "Pilih nasabah"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput 
                  placeholder="Cari nasabah..." 
                  onValueChange={setSearchValue}
                />
                <CommandEmpty>Tidak ada nasabah yang ditemukan.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {customers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      value={customer.id}
                      onSelect={() => {
                        field.onChange(customer.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === customer.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div>
                        <p>{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {errorMessage && (
        <p className="text-sm font-medium text-destructive">{errorMessage as string}</p>
      )}
    </div>
  );
};