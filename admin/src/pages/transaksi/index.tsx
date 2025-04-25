import { useSearchParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TablePagination from "@/components/organisms/TablePagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/services/order/types";
import { useOrderListQuery } from "@/services/order/queries";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderMutation } from "@/services/order/mutations";

type OrderStatus =
  | "pending"
  | "approved"
  | "preparing"
  | "completed"
  | "cancelled";

const OrdersListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const status = (searchParams.get("status") as OrderStatus) || "all";
  const { data: orders, isLoading } = useOrderListQuery({
    page,
    pageSize,
    status,
  });
  const updateOrderStatus = useUpdateOrderMutation();

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      pageSize: pageSize.toString(),
    });
  };

  return (
    <Card className="pt-6">
      <CardHeader>
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold">Pesanan</h1>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) =>
                setSearchParams((prev) => {
                  if (value === "all") {
                    prev.delete("status");
                  } else {
                    prev.set("status", value);
                  }
                  return prev;
                })
              }
              defaultValue={searchParams.get("status") || "all"}
            >
              <SelectTrigger id="statusFilter" className="w-[130px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) =>
                setSearchParams((prev) => {
                  prev.set("pageSize", value.toString());
                  return prev;
                })
              }
            >
              <SelectTrigger id="pageSizeSelect">
                <SelectValue placeholder={pageSize.toString()} />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-sm text-muted-foreground ">
          Showing {pageSize * (page - 1) + 1} to{" "}
          {Math.min(pageSize * page, orders?.pagination?.totalData || 0)} of{" "}
          {orders?.pagination?.totalData || 0} entries
        </p>
      </CardHeader>
      <CardContent>
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex justify-center items-center h-32">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders?.data?.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.customerEmail}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) => {
                        updateOrderStatus.mutate({
                          id: order.id,
                          status: value as
                            | "pending"
                            | "approved"
                            | "preparing"
                            | "completed"
                            | "cancelled",
                        });
                      }}
                    >
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">pending</SelectItem>
                        <SelectItem value="approved">approved</SelectItem>
                        <SelectItem value="preparing">preparing</SelectItem>
                        <SelectItem value="completed">completed</SelectItem>
                        <SelectItem value="cancelled">cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>Rp. {order.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    <Link to={`/orders/${order.id}`}>
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={page}
          totalPages={orders?.pagination?.totalPage || 1}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default OrdersListPage;
