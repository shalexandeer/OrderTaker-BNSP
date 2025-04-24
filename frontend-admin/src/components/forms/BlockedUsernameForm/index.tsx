import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { blockedUsernameSchema } from "./schema";

interface BlockedUsernameBody {
  username: string;
}

interface BlockedUsernameFormProps {
  onSubmit: SubmitHandler<BlockedUsernameBody>;
  isPending: boolean;
  defaultValues?: Partial<BlockedUsernameBody>;
  loadingEvent?: boolean;
  mode: "add" | "edit"; // Added mode prop
}

const BlockedUsernameForm = forwardRef(({
  onSubmit,
  isPending,
  defaultValues,
  mode,
}: BlockedUsernameFormProps, ref) => {
  const form = useForm<BlockedUsernameBody>({
    resolver: yupResolver(blockedUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  // Expose the `reset` method
  useImperativeHandle(ref, () => ({
    reset: () => form.reset({ username: "" }),
  }));

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const isDisabled = !form.formState.isDirty || isPending;

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter blocked username..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={isDisabled} loading={isPending}>
          {mode === 'add' ? 'Create Category' : 'Update Category'}
        </Button>
      </form>
    </Form>
  );
});

export default BlockedUsernameForm;
