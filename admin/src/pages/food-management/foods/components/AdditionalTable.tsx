import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import DialogEditAdditional from "./DialogEditAdditional";
import DialogRemoveAdditional from "./DialogRemoveAdditional";
import DialogAddAdditional from "./DialogAddAdditional";
import { Additional } from "@/services/additional/types";

interface AdditionalTableProps {
  foodId: string;
  additionals: Additional[];
}

const AdditionalTable = ({ foodId, additionals }: AdditionalTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {additionals.map((additional) => (
            <TableRow key={additional.id}>
              <TableCell>{additional.name}</TableCell>
              <TableCell>Rp. {additional.price.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <DialogEditAdditional additional={additional}>
                    <Button variant="secondary" size="sm">
                      <PencilIcon className="size-4" />
                    </Button>
                  </DialogEditAdditional>
                  <DialogRemoveAdditional additional={additional}>
                    <Button variant="destructive" size="sm">
                      <TrashIcon className="size-4" />
                    </Button>
                  </DialogRemoveAdditional>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <DialogAddAdditional foodId={foodId} />
      </div>
    </div>
  );
};

export default AdditionalTable;
