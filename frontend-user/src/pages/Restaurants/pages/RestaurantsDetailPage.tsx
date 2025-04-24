import { memo, useEffect } from "react";
import { useParams } from "react-router";
import { IonPage } from "@ionic/react";

import { DetailPageHeader, SkeletonDetailPage } from "../../../components";

import { useTypedSelector } from "../../../stores";
import DetailRestaurantContent from "../components/DetailRestaurantContent";
import {
  useGetFoodAdditionals,
  useGetFoodById,
} from "../../../services/foods/foods.query";

export type ParamsId = {
  categoryId: string;
  id: string;
};

const RestaurantsDetailPage: React.FC = () => {
  const { id } = useParams<ParamsId>();
  const { user, mejaData, restaurantProfile } = useTypedSelector(
    ({ user }) => user,
  );

  const { data: food, isFetching: loadingFood } = useGetFoodById(id);
  const { data: additional, isFetching: loadingAdditional } =
    useGetFoodAdditionals(id);

  useEffect(() => {
    if (user == null || mejaData == null || restaurantProfile == null) {
      window.location.replace("/");
    }
  }, [restaurantProfile, mejaData, user]);

  return (
    <IonPage>
      <DetailPageHeader defaultHref="/restaurants" />
      {!loadingFood && !loadingAdditional && food !== null && food ? (
        <DetailRestaurantContent items={food} additional={additional} />
      ) : (
        <SkeletonDetailPage />
      )}
    </IonPage>
  );
};

export default memo(RestaurantsDetailPage);
