import React, { memo } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import { PageListHeader, RestaurantPageList } from "../../components";
import { RootState, useTypedSelector } from "../../stores";
import useGet from "../../hooks/useGet";
import IonFabCart from "../../components/elements/IonFab/IonFabCart";

const Restaurants: React.FC = () => {
  return <h1>nothing</h1>;
  // const { token, hotel_id } = useTypedSelector(
  //   (state: RootState) => state.user,
  // ).user;

  // const [foods, __, loadingFood] = useGet<Foods[] | null>({
  //   link: FoodService.getFoods(+hotel_id),
  //   token,
  // });
  // const [category, _, loadingCategory] = useGet<FoodsCategory[]>({
  //   link: FoodService.getFoodCategories(+hotel_id),
  //   token,
  // });

  // return (
  //   <IonPage>
  //     <PageListHeader headerFor="Foods" />
  //     <IonContent className="fade-in">
  //       <IonHeader collapse="condense">
  //         <IonToolbar>
  //           <IonTitle size="large">Foods</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>
  //       <RestaurantPageList
  //         foods={foods}
  //         category={category}
  //         loading={{ loadingFood, loadingCategory }}
  //       />
  //     </IonContent>
  //     <IonFabCart />
  //   </IonPage>
  // );
};

export default memo(Restaurants);
