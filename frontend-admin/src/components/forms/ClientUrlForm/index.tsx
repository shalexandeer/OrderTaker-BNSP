import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientUrlSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { BASE_URL } from "@/services/url";
import { IconTrash } from "@tabler/icons-react";

interface ClientUrlFormProps {
  onSubmit: SubmitHandler<ClientUrlBody>;
  isPending: boolean;
  defaultValues?: Partial<ClientUrlBody>;
}

const extractUrl = (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const urls = Array.from(urlParams.entries()).map((entry) => decodeURIComponent(entry[1]));
  return urls;
}

const ClientUrlForm: React.FC<ClientUrlFormProps> = ({
  onSubmit,
  isPending,
  defaultValues,
}) => {
  const form = useForm<ClientUrlBody>({
    resolver: yupResolver(clientUrlSchema),
    defaultValues: {
      title: '',
      image: '',
      url: defaultValues?.url || "",
      ...defaultValues,
    },
  });

  const [tempUrls, setTempUrls] = React.useState<string[]>(
    defaultValues?.url ? extractUrl(defaultValues?.url) : []
  );

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
      if (defaultValues.imageUrl) {
        form.setValue('image', defaultValues.imageUrl, { shouldDirty: false });
      }
    }
  }, [defaultValues, form]);

  const handleSubmit: SubmitHandler<ClientUrlBody> = (data) => {
    const queryParams = tempUrls.map((url, index) => `url${index + 1}=${encodeURIComponent(url)}`).join('&');
    onSubmit({ ...data, url: `https://${form.getValues('title')}.com?${queryParams}` });
  };

  useEffect(() => {
    form.setValue("url", JSON.stringify(tempUrls));
  }, [tempUrls, form]);

  const handleAddUrl = () => {
    setTempUrls([...tempUrls, ""]);
  };

  const handleRemoveUrl = (index: number) => {
    setTempUrls(tempUrls.filter((_, i) => i !== index));
  };

  const handleUrlChange = (index: number, value: string) => {
    const updatedUrls = tempUrls.map((url, i) => (i === index ? value : url));
    setTempUrls(updatedUrls);
  };

  const isDisabled = !form.formState.isDirty || isPending;

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
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
                      form.setValue('image', reader.result as string, { shouldDirty: true });
                    };
                    reader.readAsDataURL(image);
                  }}
                />
              </FormControl>
              {field.value && (
                <img
                  src={!field.value.startsWith('gameclient') ? field.value : `${BASE_URL}/${field.value}`}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}
              {form.watch('image') && !field.value && (
                <img
                  src={`${BASE_URL}/${form.watch('image')}`}
                  alt="Preview"
                  className="mt-2 max-w-[200px] h-auto"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

       {/* URLs Field */}
        <div className="space-y-4">
          <FormLabel>URLs</FormLabel>
          {tempUrls.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Enter URL..."
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveUrl(index)}
              >
                <IconTrash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddUrl}>
            Add URL
          </Button>
        </div>

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={isDisabled} loading={isPending}>
          {!defaultValues ? 'Create Client URL' : 'Update Client URL'}
        </Button>
      </form>
    </Form>
  );
};

export default ClientUrlForm;
