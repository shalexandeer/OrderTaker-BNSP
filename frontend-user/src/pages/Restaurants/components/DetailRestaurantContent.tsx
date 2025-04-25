import { IonContent } from "@ionic/react";

import {
  AddToCartBottomNavigation,
  Additionaltem,
  DetailPageImage,
} from "../../../components";

import useHandleOrder from "../../../hooks/useHandleOrder";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState, useTypedDispatch } from "../../../stores";
import { useParams } from "react-router";
import { ParamsId } from "../pages/RestaurantsDetailPage";
import { BASE_URL, BASE_URL_IMG } from "../../../services/url";
import { Additional, Food, FoodCart } from "../../../interface/global";
import { updateNotes } from "../../../stores/cart/cart";

interface DetailRestaurantContentProps {
  items: Food;
  additional?: Additional[] | null;
}

const DetailRestaurantContent = ({
  items,
  additional,
}: DetailRestaurantContentProps) => {
  const dispatch = useTypedDispatch();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { cart } = useSelector(({ cart }: RootState) => cart);

  const { id } = useParams<ParamsId>();

  const {
    bookQuantity,
    totalPrice,
    notes,
    handleNotes,
    handleBookQuantity,
    handleAddToCart,
    handleAdditional,
    handleUncheckedAdditional,
  } = useHandleOrder(
    {
      foodId: id,
      price: items.price,
      name: items.name,
    },
    "food",
    cart.foodItems?.find((item) => item?.foodId === id)?.note || "",
  );

  const { name, description, price, availability, img } = items!;

  const itemExistInCart = cart?.foodItems.find(
    (item: FoodCart) => item.foodId === id,
  );

  return (
    <>
      <IonContent>
        <div className="mt-4 space-y-6 px-5">
          <DetailPageImage imageUrl={`${BASE_URL_IMG}/${img}`} />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{name}</h1>
              <p className="text-[--ion-color-primary]">
                Rp. {price.toLocaleString()}
              </p>
            </div>
            <p className={`text-justify text-sm text-[--ion-paragraph-color]`}>
              {description}
            </p>
          </div>
          {additional && additional?.length > 0 && additional !== null && (
            <div className="space-y-2">
              <h1 className="text-sm font-bold">Additional</h1>
              <Additionaltem
                handleAdditional={handleAdditional}
                additional={additional}
                handleUncheckedAdditional={handleUncheckedAdditional}
                itemExistInCart={itemExistInCart}
              />
            </div>
          )}
          <div className="space-y-2">
            <h1 className="text-sm font-bold">Notes</h1>
            <textarea
              onFocus={() => setIsFocused(!isFocused)}
              onBlur={() => setIsFocused(!isFocused)}
              onChange={(e) => {
                if (itemExistInCart) {
                  dispatch(
                    updateNotes({ from: "food", id, note: e.target.value }),
                  );
                } else {
                  handleNotes(e);
                }
              }}
              id=""
              value={itemExistInCart?.note ?? notes}
              className="min-h-[143px] w-full rounded-xl border border-[--ion-stroke-color] bg-[--ion-item-bg] p-3"
            ></textarea>
          </div>
        </div>
      </IonContent>

      <AddToCartBottomNavigation
        itemExistInCart={itemExistInCart}
        available={availability}
        totalPrice={totalPrice}
        isFocused={isFocused}
        bookQuantity={bookQuantity}
        handleAddToCart={handleAddToCart}
        handleBookQuantity={handleBookQuantity}
      />
    </>
  );
};

export default DetailRestaurantContent;
