import { IonImg, useIonAlert } from "@ionic/react";
import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../../../stores/cart/cart";
import { formatPrice } from "../../../../utils/string";
import { FoodCart } from "../../../../interface/global";

interface CartItemsProps {
  order: FoodCart;
  from: string;
}

const CartItems: React.FC<CartItemsProps> = ({ order, from }) => {
  const dispatch = useDispatch();
  const { foodId, name, price, quantity, note } = order;

  const [presentAlert] = useIonAlert();

  const formattedPrice =
    price === 0 || price === undefined || isNaN(price)
      ? 0
      : formatPrice(price * quantity);
  return (
    <div className="relative flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* <div className="relative">
          <IonImg
            src="./Burger.webp"
            className="h-[72px] w-[72px] border border-[--ion-stroke-color]"
            style={{
              objectFit: "cover",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          />
          <div className="absolute bottom-0 w-full overflow-hidden rounded-b-3xl text-center">
            <p className="relative z-10 text-xs text-white ">{from}</p>
            <div className="absolute bottom-0 h-8 w-full bg-black dark:opacity-50" />
          </div>
        </div> */}
        <div>
          <h1 className="text-base">{name}</h1>
          <div className="flex items-center gap-3 text-sm">
            <p className="text-xs">#{from}</p>
            {/* <p className="text-[--ion-color-primary]">edit notes</p> */}
          </div>
        </div>
      </div>
      <div className=" right-0 flex flex-col items-end space-y-2 ">
        <div className="flex items-center  rounded-xl bg-[--ion-item-bg]">
          <button
            className=" rounded-full border border-[--ion-stroke-color] bg-[--ion-item-bg] px-4 text-lg"
            onClick={() => {
              if (quantity === 1) {
                presentAlert({
                  header: "Remove Item",
                  message: "Are you sure to remove this item?",
                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel",
                    },
                    {
                      text: "Remove",
                      cssClass: "alert-button-confirm",
                      handler: () =>
                        dispatch(removeItem({ order, from: `${from}Items` })),
                    },
                  ],
                });
              } else {
                dispatch(decrementQuantity({ foodId, from }));
              }
            }}
          >
            -
          </button>
          <h1 className="w-8 bg-[--ion-background-color] text-center">
            {quantity}
          </h1>
          <button
            className="h-8 w-8 rounded-full border border-[--ion-stroke-color] bg-[--ion-item-bg]"
            onClick={() => dispatch(incrementQuantity({ foodId, from }))}
          >
            +
          </button>
        </div>
        <p>{formattedPrice}</p>
      </div>
    </div>
  );
};

export default CartItems;
