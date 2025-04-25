import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/custom/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { IconPencil, IconTrash } from '@tabler/icons-react';
import { tableEditorState } from '@/store/table_recoil';
import { useRecoilState } from 'recoil';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [, setActions] = useRecoilState(tableEditorState);

  const handleDelete = () => {
    setActions((prevActions) => ({
      ...prevActions,
      isDeleting: true,
      selectedItem: {
        id: row.getValue('id') as string,
        name: row.getValue('referralCode') as string,
      }
    }));
  };

  const handleEdit = () => {
    setActions((prevActions) => ({
      ...prevActions,
      isEditing: true,
      selectedItem: {
        id: row.getValue('id') as string,
        name: row.getValue('referralCode') as string,
      }
    }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
          Edit Referral
          <DropdownMenuShortcut>
            <IconPencil className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-400 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash className="size-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
