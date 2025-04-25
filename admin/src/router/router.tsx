import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import DashboardLayout from "@/components/templates/DashboardLayout";
import ReactQueryLayout from "@/components/templates/ReactQueryLayout";
import MejaManagement from "@/pages/meja";
import CategoriesManagement from "@/pages/food-management/category";
import Foods from "@/pages/food-management/foods";
import FoodManagementLayout from "@/components/templates/UserManagementLayout";
import FoodAddPage from "@/pages/food-management/foods/Add";
import FoodEditPage from "@/pages/food-management/foods/Edit";
import OrdersListPage from "@/pages/transaksi";
import DetailPage from "@/pages/transaksi/DetailPage";

const Router = () => (
  <ReactQueryLayout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/orders" element={<OrdersListPage />} />
          <Route path="/orders/:id" element={<DetailPage />} />
          {/* <Route path="/orders/new" element={<TransactionsNew />} /> */}

          <Route path="/food-management">
            <Route index element={<CategoriesManagement />} />
            <Route element={<FoodManagementLayout />}>
              <Route path="category" element={<CategoriesManagement />} />
              <Route path="foods" element={<Foods />} />
            </Route>
            <Route path="foods/new" element={<FoodAddPage />} />
            <Route path="foods/edit/:id" element={<FoodEditPage />} />
          </Route>

          <Route path="/meja" element={<MejaManagement />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ReactQueryLayout>
);

export default Router;
