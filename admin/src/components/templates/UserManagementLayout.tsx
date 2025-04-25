import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const FoodManagementLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the current tab from the URL path
  const currentTab = location.pathname.split("/").pop() || "users";

  // Handle tab change navigation
  const handleTabChange = (tab: string) => {
    navigate(`/food-management/${tab}`);
  };

  return (
    <div className="">
      {/* Tabs Navigation */}
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <TabsList className="grid  grid-cols-2 w-[400px]">
          <TabsTrigger value="foods">Manage Foods</TabsTrigger>
          <TabsTrigger value="category">Categories</TabsTrigger>
        </TabsList>
        <Outlet />
      </Tabs>
    </div>
  );
};

export default FoodManagementLayout;
