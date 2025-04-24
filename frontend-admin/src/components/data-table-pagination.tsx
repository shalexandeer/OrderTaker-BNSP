import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page, pageSize, totalPage, and totalData from the URL, or use defaults
  const page = parseInt(searchParams.get('page') || '1', 10); // React Table uses zero-indexed pages
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const totalPage = parseInt(searchParams.get('totalPage') || '1', 10);
  const totalData = parseInt(searchParams.get('totalData') || '0', 10);

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    const newSize = Number(value);
    setSearchParams({ page: '1', pageSize: newSize.toString(), totalPage: totalPage.toString(), totalData: totalData.toString() }); // Reset to first page on page size change
  };

  // Handle page change
  const handlePageChange = (newPageIndex: number) => {
      setSearchParams({ page: newPageIndex.toString(), pageSize: pageSize.toString(), totalPage: totalPage.toString(), totalData: totalData.toString() });
  };

  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSizeOption) => (
                <SelectItem key={pageSizeOption} value={`${pageSizeOption}`}>
                  {pageSizeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {page} of {totalPage}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(0)}
            disabled={table.getState().pagination.pageIndex === 0}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPage}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handlePageChange(totalPage - 1)}
            disabled={!table.getCanNextPage() || table.getState().pagination.pageIndex + 1 >= totalPage}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
