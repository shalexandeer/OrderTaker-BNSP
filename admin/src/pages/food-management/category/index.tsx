// src/pages/CategoriesManagement.tsx
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/organisms/TablePagination";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/services/category/types";
import { useCategoryListQuery } from "@/services/category/queries";
import DialogAddCategory from "./components/DialogAddCategory";
import DialogEditCategory from "./components/DialogEditCategory";
import DialogRemoveCategory from "./components/DialogRemove";

const CategoriesManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const { data: categoryData, isLoading } = useCategoryListQuery({
    page: page || 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (categoryData?.pagination) {
      const { page, pageSize, totalPage, totalData } = categoryData.pagination;
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage!.toString(),
        totalData: totalData!.toString(),
      });
      setSearchParams(params);
    }
  }, [categoryData, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  return (
    <Card className="rounded-md border">
      <CardHeader>
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl font-bold">Food Categories</h1>
          <div className="flex items-center gap-2">
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
            <DialogAddCategory />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Showing {pageSize * (page - 1) + 1} to{" "}
          {Math.min(pageSize * page, categoryData?.pagination?.totalData || 0)}{" "}
          of {categoryData?.pagination?.totalData || 0} entries
        </p>
      </CardHeader>
      <CardContent className="">
        {/* Categories Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Name</TableHead>
                <TableHead className="w-[40%]">Image</TableHead>
                <TableHead className="w-[20%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="flex justify-center items-center h-32">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {categoryData?.data?.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {category.name}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <a
                      href={category.img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Image
                    </a>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="whitespace-nowrap">
                    <div className="flex gap-2">
                      <DialogEditCategory category={category}>
                        <Button variant="secondary" size="sm">
                          <PencilIcon className="size-4" />
                        </Button>
                      </DialogEditCategory>
                      <DialogRemoveCategory category={category}>
                        <Button variant="destructive" size="sm">
                          <TrashIcon className="size-4" />
                        </Button>
                      </DialogRemoveCategory>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {categoryData?.pagination && (
          <TablePagination
            currentPage={page}
            totalPages={categoryData.pagination.totalPage ?? 1}
            onPageChange={handlePageChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CategoriesManagement;
