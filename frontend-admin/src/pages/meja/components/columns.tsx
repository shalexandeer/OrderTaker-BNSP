import { ColumnDef } from "@tanstack/react-table";
import { Referral } from "./schema";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Referral>[] = [
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
    accessorKey: 'referralCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referral Code" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue('referralCode')}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'referralSendRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Send Rate (%)" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('referralSendRate')}%</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'referralReceiveRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receive Rate (%)" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue('referralReceiveRate')}%</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'referralCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referral Count" />
    ),
    cell: ({ row }) => <div>{row.getValue('referralCount')}</div>,
    enableSorting: true,
  },
  {
    accessorKey: 'referralBalance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referral Balance" />
    ),
    cell: ({ row }) => <div>{row.getValue('referralBalance')}</div>,
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
