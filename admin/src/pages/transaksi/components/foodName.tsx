import { Skeleton } from "@/components/ui/skeleton";
import { useFoodByIdQuery } from "@/services/food/queries";

const FoodName = ({ foodId }: { foodId: string }) => {
  const { data: food, isLoading } = useFoodByIdQuery(foodId);

  if (isLoading) return <Skeleton className="h-4 w-32" />;
  if (!food) return <span>Unknown Food</span>;

  return (
    <div className="flex items-center gap-2">
      <img
        src={`http://localhost:6969/${food.img}`}
        alt={food.name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span>{food.name}</span>
    </div>
  );
};

export default FoodName;
