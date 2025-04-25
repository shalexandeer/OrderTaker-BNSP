import { useNavigate, useParams } from "react-router-dom";
import FoodMutationForm from "./components/MutationForm";
import { useFoodByIdQuery } from "@/services/food/queries";
import { useCategoryListQuery } from "@/services/category/queries";
import { useAdditionalByFoodQuery } from "@/services/additional/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import BackButton from "@/components/molecules/BackButton";
import { useUpdateFoodMutation } from "@/services/food/mutations";
import { FoodUpdatePayload } from "@/services/food/types";
import { toast } from "react-toastify";
import AdditionalTable from "./components/AdditionalTable";

const FoodEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: food, isLoading: isFoodLoading } = useFoodByIdQuery(id!);
  useCategoryListQuery();
  const { data: additionals } = useAdditionalByFoodQuery(id!);
  const editFoodMutation = useUpdateFoodMutation();

  const handleSubmit = async (data: FoodUpdatePayload) => {
    try {
      await editFoodMutation.mutateAsync({
        id: id!,
        ...data,
      });
      navigate("/food-management/foods", { replace: true });
    } catch (error) {
      // Error handling already handled by mutation
      console.error("Error creating food:", error);
      toast.error("Failed to create food. Please try again.");
    }
  };

  if (isFoodLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center  ">
        <BackButton path="food-management/foods" />
        <h1 className="text-2xl font-bold tracking-tight">Edit Makanan</h1>
      </div>
      <Card className="space-y-8 mt-4">
        <CardContent>
          <FoodMutationForm
            defaultValues={{
              name: food!.name,
              categoryId: food!.categoryId,
              description: food!.description,
              img: food!.img,
              price: food!.price,
              availability: food!.availability,
            }}
            submitButtonText="Update Food"
            onSubmit={handleSubmit}
          />
        </CardContent>

        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Additionals</h3>
          <AdditionalTable foodId={id!} additionals={additionals || []} />
        </CardContent>
      </Card>
    </>
  );
};

export default FoodEditPage;
