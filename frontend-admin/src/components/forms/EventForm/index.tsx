import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { eventSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { useEffect } from "react";
import { Switch } from '@/components/ui/switch';
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@/components/custom/datepicker";
import { useGetEventCategories } from "@/services/Events/Events.query";
import { Select, SelectContent, SelectGroup,  SelectItem,  SelectTrigger, SelectValue} from "@/components/ui/select";
import { getDirtyFields } from "@/utils/string";
import { BASE_URL } from "@/services/url";
import 'ckeditor5/ckeditor5.css';
import CKEditorComponent from "@/components/ckeditor";
import { toast } from "@/components/ui/use-toast";

interface EventFormProps {
  onSubmit: SubmitHandler<EventBody>;
  isPending: boolean;
  defaultValues?: Partial<EventBody>;
  loadingEvent?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  isPending,
  defaultValues,
}) => {
  const {data: categoryData, isLoading} = useGetEventCategories({
    page:1,
    pageSize: 100,
    orderBy: 'name',
    isAscending: true,
  }
  );

  const form = useForm<EventBody>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      name: '',
      image: '',
      description: '',
      shortDescription: '',
      categoryId: '',
      eventDate: '',
      isActive: false,
      ...defaultValues,
    },
  });
  

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      if(defaultValues.imageUrl){
        form.setValue('image', defaultValues.imageUrl, { shouldDirty: false });
      }
      
      if (categoryData && defaultValues?.category) {
        const categoryId = categoryData.data.data.find((item) => item.name === defaultValues.category)?.id;
        if (categoryId) {
          form.setValue('categoryId', categoryId, { shouldDirty: false });
        }
      }
    }
  }, [defaultValues, form, categoryData?.data?.data, categoryData]);


  const handleSubmit:SubmitHandler<EventBody> = (data) => {
    const dirtyFields = getDirtyFields(form.formState.dirtyFields, data);
    onSubmit(!defaultValues ? data : {
      ...dirtyFields,
      id: defaultValues.id,
    });
  }

  // Handle category selection
  const handleCategorySelect = (value: string) => {
    form.setValue('categoryId', value); // set the categoryId in the form state
  }

  const isDisabled = !form.formState.isDirty || isPending;

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
                <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                  const files = e.target.files;
                  if (!files) return;
                  const image = files[0];
                  if (image.size > 3 * 1024 * 1024) {
                    toast({ title: 'File size exceeds 3MB', style: { backgroundColor: 'red' } });
                    return;
                  }
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
                  src={!field.value.startsWith('events') ? field.value : `${BASE_URL}/${field.value}`}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}

               {form.watch('imageUrl') && !field.value && (
                <img 
                  src={`${BASE_URL}/${form.watch('imageUrl')}`}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <CKEditorComponent
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Description Field */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter short description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <>
                {isLoading && <p className="text-sm text-gray-500">Loading categories...</p>}
                <Select 
                  onValueChange={(value) => {
                  field.onChange(value);
                  handleCategorySelect(value);
                  }}
                  value={field.value} // Set the default value
                >
                  <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                  <SelectGroup>
                    {categoryData?.data?.data?.map((category: { id: string; name: string }) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                    ))}
                  </SelectGroup>
                  </SelectContent>
                </Select>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel>Event Date</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(date) => {
                    form.setValue(field.name, date instanceof Date ? date.toISOString() : '', { shouldDirty: true });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Active Field */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="grid">
              <FormLabel>Is Published</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={isDisabled} loading={isPending}>
          {!defaultValues ? 'Create Event' : 'Update Event'}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
