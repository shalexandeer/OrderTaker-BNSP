import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Order } from "@/services/order/types";
import { useUpdateOrderMutation } from "@/services/order/mutations";

const formSchema = z.object({
  status: z.enum([
    "pending",
    "approved",
    "preparing",
    "completed",
    "cancelled",
  ]),
});

type FormValues = z.infer<typeof formSchema>;

interface OrderStatusFormProps {
  orderId: string;
  currentStatus: Order["status"];
}

const OrderStatusForm = ({ orderId, currentStatus }: OrderStatusFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const updateMutation = useUpdateOrderMutation();

  const handleSubmit = (data: FormValues) => {
    updateMutation.mutate({
      id: orderId,
      status: data.status,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending && (
            <span className="animate-spin mr-2"></span>
          )}
          Update Status
        </Button>
      </form>
    </Form>
  );
};

export default OrderStatusForm;
