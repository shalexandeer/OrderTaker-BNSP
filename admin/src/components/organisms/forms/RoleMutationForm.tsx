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
import { useEffect } from "react";

const formSchema = z.object({
  display_name: z.string().min(3, "Role name must be at least 3 characters"),
  role_level: z.number().min(1, "Role level must be at least 1"),
  role_auth_detail: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RoleMutationFormProps {
  defaultValues?: FormValues;
  mutationFn: (data: FormValues) => Promise<void>;
  onSuccess: () => void;
  submitButtonText: string;
}

const RoleMutationForm = ({
  defaultValues,
  mutationFn,
  onSuccess,
  submitButtonText,
}: RoleMutationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      display_name: "",
      role_level: 1,
      role_auth_detail: "",
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
        description: "Role saved successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: (error as any)?.response?.data?.message || "Error",
        description:
          (error as any)?.response?.data?.data || "Failed to delete role",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
              </FormControl>
              <FormDescription>
                This is the display name for the role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Level</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter role level"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Higher levels have more permissions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role_auth_detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter role description" {...field} />
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

export default RoleMutationForm;
