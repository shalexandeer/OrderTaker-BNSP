import { ColumnDef } from "@tanstack/react-table";
import { Users } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";

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
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <div >{row.getValue('role')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('email')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'emailConfirmed',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email Confirmed" />
    ),
    cell: ({ row }) => (
      <Badge className={row.getValue('emailConfirmed') ? "bg-green-700 text-white" : ''} variant={row.getValue('emailConfirmed') ? "default" : "destructive"}>{row.getValue('emailConfirmed') ? 'Verified' : 'Unverified'}</Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'emailConfirmedDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ConfirmedAt" />
    ),
    cell: ({ row }) => <div>{new Date(row.getValue('emailConfirmedDate')).toLocaleDateString()}</div>,
    enableSorting: true,
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
    cell: ({row}) => <DataTableRowActions row={row} />,
  },
]
