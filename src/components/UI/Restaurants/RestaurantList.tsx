import React, { useMemo, useState } from "react";
import { IonSpinner, useIonRouter } from "@ionic/react";

import PillCategoriesList from "../PillCategory/PillCategoriesList";

import { Category, Food } from "../../../interface/global";
import { RestaurantPageItem } from "../..";

interface RestaurantListProps {
  foods: Food[] | null;
  category: Category[] | null;
  loading: {
    loadingFood: boolean;
    loadingCategory: boolean;
  };
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  foods,
  category,
  loading,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { loadingFood, loadingCategory } = loading;
  const router = useIonRouter();

  const handleRedirectToDetailPage = (id: string, foodCategoryId: string) => {
    router.push(`/restaurants/${foodCategoryId}/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="mr-5">
        <PillCategoriesList
          onClick={(id: string | null) => {
            setSelectedCategory(id);
          }}
          loadingCategory={loadingCategory}
          items={category}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="grid">
        {loadingFood && (
          <div className="grid place-items-center">
            <IonSpinner name="crescent" className="size-14" />
          </div>
        )}

        {!loadingFood && foods?.length === 0 && (
          <div className="grid place-items-center">
            <p className="text-center">No food available</p>
          </div>
        )}

        {!loadingFood &&
          foods?.map((menu) => (
            <React.Fragment key={menu.id}>
              <RestaurantPageItem
                loadingFood={loading.loadingFood}
                onClick={handleRedirectToDetailPage}
                menu={menu}
              />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default RestaurantList;
