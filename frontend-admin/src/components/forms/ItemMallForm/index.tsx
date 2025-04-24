/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { itemMallSchema } from "./schema";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useGetItemMallCategory } from "@/services/Shop/Shop.query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/custom/multiselect";
import { BASE_URL } from "@/services/url";

interface ItemMallFormProps {
  onSubmit: SubmitHandler<ItemMallBody>;
  isPending: boolean;
  isLoading?: boolean;
  defaultValues?: Partial<ItemMallBody>;
}

const ItemMallForm: React.FC<ItemMallFormProps> = ({ onSubmit, isPending, defaultValues }) => {
  const [durationInputType, setDurationInputType ] = useState<'days' | 'minutes' | 'hours'>('hours');
  const [durationInputValue, setDurationInputValue] = useState(""); // New state variable

  const form = useForm<ItemMallBody>({
    resolver: yupResolver(itemMallSchema),
    defaultValues: {
      itemId: 0,
      itemName: '',
      itemImage: '',
      itemDescription: '',
      itemQuantity: 0,
      streamerPrice: 0,
      cashCoinPrice: 0,
      stock: 0,
      sold: 0,
      isPermanent: false,
      isOnSale: false,
      durationTimeInMinutes: 0,
      itemMallCategories: [],
      ...defaultValues,
    },
  });

  const { data: itemMallCategory, isLoading } = useGetItemMallCategory();

  const handleNumberInput = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ItemMallBody) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      form.setValue(fieldName, parseFloat(value) || 0, { shouldDirty: true });
      await form.trigger(fieldName); 
    }
  };

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      if (defaultValues?.itemMallCategories) {
        const selectedCategories = defaultValues.itemMallCategories?.map(category => ({ id: category.id }));
        form.setValue("itemMallCategories", selectedCategories, { shouldDirty: true });
      }
      // Set durationInputValue based on durationInputType and durationTimeInMinutes
      if (defaultValues.durationTimeInMinutes !== undefined) {
        const durationTimeInMinutes = defaultValues.durationTimeInMinutes;
        let inputValue = "";
        if (durationTimeInMinutes < 60) {
          setDurationInputType("minutes");
          inputValue = durationTimeInMinutes.toString();
        } else if (durationTimeInMinutes < 24 * 60) {
          setDurationInputType("hours");
          inputValue = (durationTimeInMinutes / 60).toString();
        } else {
          setDurationInputType("days");
          inputValue = (durationTimeInMinutes / (24 * 60)).toString();
        }
        setDurationInputValue(inputValue);
      }
    }
  }, [defaultValues, form]);

  const getDirtyFields = (dirtyFields: any, allValues: any) => {
    const dirtyData: any = {};
    for (const key in dirtyFields) {
      if (dirtyFields[key] === true) {
        dirtyData[key] = allValues[key];
      } else if (typeof dirtyFields[key] === 'object') {
        dirtyData[key] = getDirtyFields(dirtyFields[key], allValues[key]);
      }
    }
    return dirtyData;
  };

  const handleSubmit: SubmitHandler<ItemMallBody> = (data) => {
    const dirtyFields = getDirtyFields(form.formState.dirtyFields, data);
    onSubmit(!defaultValues ? data : dirtyFields);
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Item Id */}
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Id</FormLabel>
              <FormControl>
                <Input placeholder="Enter item ID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="itemImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const image = files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      form.setValue(field.name, reader.result as string, { shouldDirty: true });
                    };
                    reader.readAsDataURL(image);
                  }}
                />
              </FormControl>

              {field.value && (
                <img 
                  src={!field.value.startsWith('item-mall-images') ? field.value : `${BASE_URL}/${field.value}`}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Name */}
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter item name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Description */}
        <FormField
          control={form.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter item description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Item Quantity */}
        <FormField
          control={form.control}
          name="itemQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Quantity</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter item quantity..."
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleNumberInput(e, "itemQuantity")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Streamer Price */}
        <FormField
          control={form.control}
          name="streamerPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Streamer Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter streamer price..."
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleNumberInput(e, "streamerPrice")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter stock..."
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleNumberInput(e, "stock")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cash Coin Price */}
        <FormField
          control={form.control}
          name="cashCoinPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cash Coin Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter cash coin price..."
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleNumberInput(e, "cashCoinPrice")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sold */}
        <FormField
          control={form.control}
          name="sold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sold</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter sold amount..."
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleNumberInput(e, "sold")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

           {/* Duration Time In Minutes */}
        <FormField
          control={form.control}
          name="durationTimeInMinutes"
          render={() => (
          <FormItem>
            <FormLabel>Duration Time</FormLabel>
            <FormControl>
            <div className="grid grid-cols-[20%_auto] gap-2">
              <Select
              value={durationInputType}
              onValueChange={(value) => {
                setDurationInputType(value as "days" | "hours" | "minutes");
                setDurationInputValue("");
                form.setValue("durationTimeInMinutes", 0, { shouldDirty: true });
              }}
              disabled={form.watch("isPermanent")}
              >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectItem key={0} value="days">Days</SelectItem>
                <SelectItem key={1} value="hours">Hours</SelectItem>
                <SelectItem key={2} value="minutes">Minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
              </Select>
              <Input
              type="text"
              placeholder={`Enter duration time in ${durationInputType}...`}
              value={durationInputValue}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                setDurationInputValue(value);
                const numericValue = parseFloat(value) || 0;
                let durationInMinutes = numericValue;
                if (durationInputType === "days") {
                  durationInMinutes = numericValue * 24 * 60;
                } else if (durationInputType === "hours") {
                  durationInMinutes = numericValue * 60;
                }
                form.setValue(
                  "durationTimeInMinutes",
                  durationInMinutes,
                  { shouldDirty: true }
                );
                }
              }}
              disabled={form.watch("isPermanent")}
              />
            </div>
            </FormControl>
            <FormMessage />
          </FormItem>
          )}
        />

        <div className="grid-cols-2 grid">
          {/* Is Permanent */}
          <FormField
            control={form.control}
            name="isPermanent"
            render={({ field }) => (
              <FormItem className="grid">
              <FormLabel>Is Permanent</FormLabel>
              <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    form.setValue("durationTimeInMinutes", 0, { shouldDirty: true });
                    setDurationInputValue("");
                  }
                }}
                aria-label="Is permanent toggle"
                />
            </FormControl>
            <FormMessage />
            </FormItem>
          )}/>

          {/* Is On Sale */}
          <FormField
            control={form.control}
            name="isOnSale"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>Is On Sale</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Is on sale toggle"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

          {/* Category Selection */}
        <FormField
          control={form.control}
          name="itemMallCategories"
          render={() => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <>
                  {isLoading && <p className="text-sm text-gray-500">Loading categories...</p>}
                  <MultiSelect
                    options={itemMallCategory?.data.map((category: { id: number; name: string }) => ({
                      label: category.name,
                      value: category.id.toString(),
                    })) || []}
                    defaultValue={['1']}
                    onValueChange={(string) => {
                      form.setValue('itemMallCategories', string.map(value => ({ id: parseInt(value) })), { shouldDirty: true })
                    }}
                    // onChange={handleCategorySelect}
                  />
                </>
              </FormControl>

              {/* Selected Categories as Chips */}
              {/* <div className="mt-2 flex flex-wrap gap-2">
                {form.getValues("itemMallCategories")?.length > 0 ? (
                  form.getValues("itemMallCategories").map((category: { id: number }, index: number) => {
                    const categoryName = itemMallCategory?.data.find((cat) => cat.id === category.id)?.name;
                    return (
                      <Badge
                        key={index}
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => handleCategoryRemove(category.id)}
                      >
                        <span>{categoryName || "Unknown Category"}</span>
                        <button type="button" className="ml-1">✕</button>
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500">No categories selected</p>
                )}
              </div> */}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={!form.formState.isDirty || isPending} loading={isPending} type="submit">
          {defaultValues ? "Update Item" : "Create Item"}
        </Button>
      </form>
    </Form>
  );
};

export default ItemMallForm;
