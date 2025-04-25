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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TablePagination from "@/components/organisms/TablePagination";
import { Link, LinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMejaListQuery } from "@/services/meja/queries";
import DialogEditMeja from "./components/DialogEditMeja";
import DialogRemoveMeja from "./components/DialogRemove";
import DialogAddMeja from "./components/DialogAddMeja";
import { FRONTEND_URL, RESTAURANT_ID } from "@/services/axiosInstance";
import { toast } from "react-toastify";

const MejaManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const { data: mejaData, isLoading } = useMejaListQuery({
    page: page || 1,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (mejaData?.pagination) {
      const { page, pageSize, totalPage, totalData } = mejaData.pagination;
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        totalPage: totalPage.toString(),
        totalData: totalData.toString(),
      });
      setSearchParams(params);
    }
  }, [mejaData, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  const handleCopyLink = (mejaId: string) => {
    const url = `${FRONTEND_URL}/${RESTAURANT_ID}/${mejaId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard");
    });
  };

  return (
    <div className="pt-6">
      <Card className="rounded-md border">
        <CardHeader>
          <div className="flex items-center justify-between ">
            <h1 className="text-2xl font-bold">Manajemen Meja</h1>
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
              <DialogAddMeja />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {pageSize * (page - 1) + 1} to{" "}
            {Math.min(pageSize * page, mejaData?.pagination?.totalData || 0)} of{" "}
            {mejaData?.pagination?.totalData || 0} entries
          </p>
        </CardHeader>
        <CardContent className="">
          {/* Roles Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Number</TableHead>
                  <TableHead className="w-[15%]">Capacity</TableHead>
                  <TableHead className="w-[20%]">Status</TableHead>
                  <TableHead className="w-[20%]">Location</TableHead>
                  <TableHead className="w-[20%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <div className="flex justify-center items-center h-32">
                        <Skeleton className="h-8 w-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {mejaData?.data?.map((meja) => (
                  <TableRow key={meja.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {meja.number}
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {meja.capacity} person
                    </TableCell>

                    <TableCell className="truncate max-w-[250px]">
                      <Badge>{meja.status}</Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap">
                      {meja.location}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="whitespace-nowrap">
                      <div className="flex gap-2">
                        <DialogEditMeja meja={meja}>
                          <Button variant="secondary" size="sm">
                            <PencilIcon className="size-4" />
                          </Button>
                        </DialogEditMeja>
                        <DialogRemoveMeja meja={meja}>
                          <Button variant="destructive" size="sm">
                            <TrashIcon className="size-4" />
                          </Button>
                        </DialogRemoveMeja>
                        <Button
                          size="sm"
                          onClick={() => handleCopyLink(meja.id)}
                        >
                          <LinkIcon className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {mejaData?.pagination && (
            <TablePagination
              currentPage={page}
              totalPages={mejaData.pagination.totalPage}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MejaManagement;
