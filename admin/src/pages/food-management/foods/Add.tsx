import { useNavigate } from "react-router-dom";
import { FoodCreatePayload } from "@/services/food/types";
import { useCreateFoodMutation } from "@/services/food/mutations";
import FoodMutationForm from "./components/MutationForm";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/components/molecules/BackButton";
import { toast } from "react-toastify";

const FoodAddPage = () => {
  const navigate = useNavigate();
  const createMutation = useCreateFoodMutation();

  const handleSubmit = async (data: FoodCreatePayload) => {
    try {
      await createMutation.mutateAsync(data);
      navigate("/food-management/foods", { replace: true });
    } catch (error) {
      console.error("Error creating food:", error);
      toast.error("Failed to create food. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center  ">
        <BackButton path="food-management/foods" />
        <h1 className="text-2xl font-bold tracking-tight">Tambah Makanan</h1>
      </div>
      <Card className="space-y-8 mt-6">
        <CardContent>
          <FoodMutationForm
            submitButtonText="Create Food"
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default FoodAddPage;
