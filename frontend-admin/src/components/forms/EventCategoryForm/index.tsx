import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { eventSchema } from "./schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface EventCategoryBody {
  name: string;
}

interface EventCategoryFormProps {
  onSubmit: SubmitHandler<EventCategoryBody>;
  isPending: boolean;
  defaultValues?: Partial<EventCategoryBody>;
  loadingEvent?: boolean;
  mode: "add" | "edit"; // Added mode prop
}

const EventCategoryForm = forwardRef(({
  onSubmit,
  isPending,
  defaultValues,
  mode,
}: EventCategoryFormProps, ref) => {
  const form = useForm<EventCategoryBody>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      name: '',
    },
  });

  // Expose the `reset` method
  useImperativeHandle(ref, () => ({
    reset: () => form.reset({ name: "" }),
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

        {/* Submit Button */}
        <Button className="w-full mt-6" disabled={isDisabled} loading={isPending}>
          {mode === 'add' ? 'Create Category' : 'Update Category'}
        </Button>
      </form>
    </Form>
  );
});

export default EventCategoryForm;
