import CardRestaurant from "../../../elements/CardRestaurant";
import { IonImg, IonSkeletonText } from "@ionic/react";

const RestaurantHomeSkeleton = () => {
  return (
    <>
      <CardRestaurant className="w-[160px] rounded-xl border border-[--ion-stroke-color]">
        <CardRestaurant.Body>
          <IonSkeletonText
            className="h-[120px] w-full rounded-xl border border-t-0 border-[--ion-stroke-color]"
            animated
          />
        </CardRestaurant.Body>
        <CardRestaurant.Title className="flex flex-col items-start p-3">
          <h1 className="w-full text-sm">
            <IonSkeletonText className="h-2 rounded-xl" animated />
          </h1>
          <p className="w-16 text-sm font-semibold text-[--ion-color-primary]">
            <IonSkeletonText className="h-2 rounded-xl" animated />
          </p>
        </CardRestaurant.Title>
      </CardRestaurant>
    </>
  );
};

export default RestaurantHomeSkeleton;
