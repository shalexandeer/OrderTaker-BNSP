import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Food } from "@/services/food/types";

interface FoodCardProps {
  food: Food;
}

const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <Card className="w-full max-w-sm transition-shadow hover:shadow-lg">
      <CardHeader>
        <img
          src={food.img}
          alt={food.name}
          className="w-full h-48 object-cover  border"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{food.name}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={food.availability ? "default" : "destructive"}>
            {food.availability ? "Available" : "Unavailable"}
          </Badge>
          <span className="text-muted-foreground">
            Rp. {food.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="mt-4">
          <Link
            to={`/food-management/foods/edit/${food.id}`}
            className="text-sm text-blue-500 hover:underline"
          >
            Manage Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
