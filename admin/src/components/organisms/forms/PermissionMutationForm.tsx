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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface PermissionMutationFormProps {
  defaultValues?: FormValues;
  mutationFn: (data: FormValues) => Promise<void>;
  onSuccess: () => void;
  submitButtonText: string;
}

const PermissionMutationForm = ({
  defaultValues,
  mutationFn,
  onSuccess,
  submitButtonText,
}: PermissionMutationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await mutationFn(data);
      toast({
        title: "Success",
        description: "Permission saved successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          (error as any)?.response?.data?.message ||
          "Failed to save permission",
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
              <FormLabel>Permission Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter permission name" {...field} />
              </FormControl>
              <FormDescription>
                e.g., "user:create", "settings:edit"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this permission allows"
                  {...field}
                />
              </FormControl>
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

export default PermissionMutationForm;
