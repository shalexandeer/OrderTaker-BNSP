import { useFoodListQuery } from "@/services/food/queries";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import TablePagination from "@/components/organisms/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DialogRemoveFood from "./components/DialogRemoveFood";

const FoodsManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
  const { data: foodsData, isLoading } = useFoodListQuery({
    page: page || 1,
    pageSize: pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  useEffect(() => {
    if (foodsData?.pagination) {
      const { page, pageSize, totalPage, totalData } = foodsData.pagination;
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage!.toString(),
        totalData: totalData!.toString(),
      });
      setSearchParams(params);
    }
  }, [foodsData]);

  return (
    <Card className="pt-6">
      <CardHeader className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Food Management</h1>
        <div className="flex gap-2">
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
          <Link to="/food-management/foods/new">
            <Button className="w-full justify-start">
              <PlusIcon className="mr-2" />
              Add Food
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%]">No</TableHead>
              <TableHead className="w-[40%]">Food</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[20%]">Actions</TableHead>
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
              foodsData?.data?.map((food, index) => (
                <TableRow key={food.id}>
                  <TableCell className="font-medium">
                    {pageSize * (page - 1) + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:6969/${food.img}`}
                        alt={food.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <span className="font-medium">{food.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={food.availability ? "default" : "destructive"}
                    >
                      {food.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    Rp. {food.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link to={`/food-management/foods/edit/${food.id}`}>
                        <Button variant="secondary" size="sm">
                          <PencilIcon className="size-4" />
                        </Button>
                      </Link>
                      <DialogRemoveFood food={food}>
                        <Button variant="destructive" size="sm">
                          <TrashIcon className="size-4" />
                        </Button>
                      </DialogRemoveFood>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

      {/* Pagination Controls */}
      {foodsData?.pagination && (
        <TablePagination
          currentPage={page}
          totalPages={foodsData.pagination.totalPage!}
          onPageChange={handlePageChange}
        />
      )}
    </Card>
  );
};

export default FoodsManagement;
