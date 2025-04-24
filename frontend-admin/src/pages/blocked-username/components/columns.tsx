import { ColumnDef } from "@tanstack/react-table";
import { Users } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('username')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'blockedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blocked At" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('blockedAt')).toLocaleString()}</div>
    ),
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({row}) => <DataTableRowActions row={row} />,
  },
]
