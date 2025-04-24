import { useRef, useState } from "react";
import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateEventCategory, useGetEventCategories, useDeleteEventCategory, useUpdateEventCategory } from "@/services/Events/Events.query";
import EventCategoryForm from "@/components/forms/EventCategoryForm";

export const DialogAddCategory = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add"); // Tracks whether adding or editing
  const [editingCategory, setEditingCategory] = useState<{ name: string; id: string } | null>(null); // For handling updates
  const queryClient = useQueryClient();
  const formRef = useRef<{ reset: () => void } | null>(null); // Reference to form instance

  const { data: categoryData, isLoading: loadingCategory } = useGetEventCategories({
    page: 1,
    pageSize: 100,
    orderBy: "name",
    isAscending: true,
  });

  const createMutation = useCreateEventCategory({
    onSuccess: ({ message }) => {
      toast({ title: message, style: { backgroundColor: "green" } });
      queryClient.invalidateQueries({ queryKey: ["event-category"] });
      formRef.current?.reset(); // Reset form on success
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: "red" } });
    },
  });

  const updateMutation = useUpdateEventCategory({
    onSuccess: ({ message }) => {
      toast({ title: message, style: { backgroundColor: "green" } });
      queryClient.invalidateQueries({ queryKey: ["event-category"] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: "red" } });
    },
  });

  const deleteMutation = useDeleteEventCategory({
    onSuccess: ({ message }) => {
      toast({ title: message, style: { backgroundColor: "green" } });
      queryClient.invalidateQueries({ queryKey: ["event-category"] });
    },
    onError: ({ response }) => {
      const responseStatus = (response?.data as { message: string }).message;
      toast({ title: responseStatus, style: { backgroundColor: "red" } });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (category: { id: string; name: string }) => {
    setEditingCategory(category);
    setMode("edit");
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setMode("add");
    setOpen(true);
  };

  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleAdd}>
          Manage Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] flex flex-col">
        <DialogHeader className="sticky top-0 bg-background">
          <DialogTitle>Manage Categories</DialogTitle>
          <DialogDescription>
            Manage your categories here. You can add, edit, or delete categories.
          </DialogDescription>
        </DialogHeader>

        {/* Category List */}
        <div className="space-y-4">
          <span className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Existing Categories</h2>
            {mode !=='add'&&  <Button variant="outline" onClick={() => setMode('add')}>
              Add Category
            </Button>}
           
          </span>
          {loadingCategory && <p>Loading...</p>}
          {categoryData?.data?.data?.map((category) => (
            <div key={category.id} className="flex justify-between items-center">
              <span>{category.name}</span>
              <div>
                <Button variant="outline" onClick={() => handleEdit(category)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(category.id)} className="ml-2">
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center">
            {categoryData?.data?.data?.length === 0 ? <p>No categories found.</p>: <p></p>}

          </div>
        </div>
        <span>
          <h1 className="text-xl font-bold">{mode === "edit" ? "Edit Category" : "Add Category"}</h1>
          <p className="text-sm text-muted-foreground">{mode === "edit" ? "Update the category details below." : "Enter details to create a new category."}</p>
        </span>
        <div className="overflow-y-auto flex-1">
          <EventCategoryForm
            onSubmit={(data) => {
              if (mode === "edit" && editingCategory) {
                updateMutation.mutate({ ...data, id: editingCategory.id });
              } else {
                createMutation.mutate(data);
              }
            }}
            isPending={isPending}
            defaultValues={mode === "edit" ? editingCategory || undefined : undefined}
            mode={mode}
            ref={formRef} // Pass ref to the form
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
