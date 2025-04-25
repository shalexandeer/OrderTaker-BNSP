import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FoodName from "./components/foodName";
import OrderStatusForm from "./components/OrderStatusForm";
import { useOrderByIdQuery } from "@/services/order/queries";
import { useOrderItemsQuery } from "@/services/orderItem/queries";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/molecules/BackButton";

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading: isOrderLoading } = useOrderByIdQuery(id!);
  const { data: items, isLoading: isItemsLoading } = useOrderItemsQuery(id!);

  if (isOrderLoading || isItemsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" space-y-4">
      <div className="flex items-center  ">
        <BackButton path="orders" />
        <h1 className="text-xl font-bold tracking-tight">Kembali</h1>
      </div>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Information</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Customer:</span>{" "}
                {order?.customerName}
              </div>
              <div>
                <span className="font-medium">Email:</span>{" "}
                {order?.customerEmail}
              </div>
              <div>
                <span className="font-medium">Payment:</span>{" "}
                {order?.paymentMethod}
              </div>
              <div>
                <span className="font-medium">Total:</span> Rp.{" "}
                {order?.totalPrice.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Status Management</h3>
            <OrderStatusForm orderId={id!} currentStatus={order!.status} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Order Items</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <FoodName foodId={item.foodId} />
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>Rp. {item.price.toLocaleString()}</TableCell>
                    <TableCell>{item.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
