/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  img: z.string().url("Must be a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

interface CategoryMutationFormProps {
  defaultValues?: Partial<FormValues>;
  mutationFn: (data: FormValues) => Promise<void>;
  onSuccess: () => void;
  submitButtonText: string;
}

const CategoryMutationForm = ({
  defaultValues,
  mutationFn,
  onSuccess,
  submitButtonText,
}: CategoryMutationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      img: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  const onSubmit = async (data: FormValues) => {
    try {
      await mutationFn(data);
      toast({
        title: "Success",
        description: "Category saved successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: (error as any)?.response?.data?.message || "Error",
        description:
          (error as any)?.response?.data?.data || "Failed to save category",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter the URL for the category image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting && (
            <span className="animate-spin mr-2">...</span>
          )}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryMutationForm;
