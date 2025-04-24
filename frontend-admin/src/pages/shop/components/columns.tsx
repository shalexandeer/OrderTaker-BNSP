import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ItemMall } from "./schema";
import { BASE_URL } from "@/services/url";

export const columns: ColumnDef<ItemMall>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'itemId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('itemId')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'itemImage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
      <img src={`${BASE_URL}/${row.getValue('itemImage')}`} alt="Item" className="max-w-28 w-full" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'itemName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('itemName')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'itemDescription',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue('itemDescription')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'itemQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div>{row.getValue('itemQuantity')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'streamerPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Streamer Price" />
    ),
    cell: ({ row }) => <div>{row.getValue('streamerPrice')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'cashCoinPrice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cash Coin Price" />
    ),
    cell: ({ row }) => <div>{row.getValue('cashCoinPrice')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => <div>{row.getValue('stock')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'sold',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sold" />
    ),
    cell: ({ row }) => <div>{row.getValue('sold')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'isPermanent',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Permanent" />
    ),
    cell: ({ row }) => <div>{row.getValue('isPermanent') ? 'Yes' : 'No'}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'isOnSale',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is On Sale" />
    ),
    cell: ({ row }) => <div>{row.getValue('isOnSale') ? 'Yes' : 'No'}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'durationTimeInMinutes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('durationTimeInMinutes') as number;
        let displayValue;
        if (value < 60) {
          displayValue = `${value} minutes`;
        } else if (value < 1440) {
          displayValue = `${(value / 60).toFixed(1)} hours`;
        } else {
          displayValue = `${(value / 1440).toFixed()} days`;
        }
        return <div>{displayValue}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: 'itemMallCategories',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }) => (
      <div>
        {(row.getValue('itemMallCategories') as ItemMallCategory[])?.map((category: ItemMallCategory) => (
          <span key={category.name} style={{ color: category.color }}>
            {category.name}
          </span>
        ))}
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('createdAt')).toLocaleDateString()}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Edited" />
    ),
    cell: ({ row }) => (
      <div>
        {new Date(row.getValue('updatedAt')).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })}
      </div>
    ),
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
