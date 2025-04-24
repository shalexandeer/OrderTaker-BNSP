import {
  IonButton,
  IonFooter,
  IonIcon,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { cartOutline, chatboxOutline } from "ionicons/icons";
import useCartItemCounter from "../../../hooks/useCartItemCounter";
import { formatPrice } from "../../../utils/string";
import { FoodCart } from "../../../interface/global";

interface AddToCartBottomNavigationProps {
  isFocused?: boolean;
  bookQuantity: number;
  totalPrice?: number;
  itemExistInCart?: FoodCart;
  available?: boolean;
  handleAddToCart: () => void;
  handleBookQuantity: (action: "add" | "remove") => void;
}

const AddToCartBottomNavigation = ({
  isFocused,
  bookQuantity,
  totalPrice,
  itemExistInCart,
  available,
  handleAddToCart,
  handleBookQuantity,
}: AddToCartBottomNavigationProps) => {
  const availability = available === false ? "Not Available" : "Add to Cart";
  const formattedPrice =
    totalPrice === 0 || totalPrice === undefined || isNaN(totalPrice)
      ? `Rp. ${0}`
      : formatPrice(totalPrice);
  const router = useIonRouter();

  return (
    <IonFooter translucent={true} className={`${isFocused && "hidden"}`}>
      <IonToolbar className="bg-[--ion-item-bg]">
        <div className="space-y-1 px-5 py-2">
          <div className="flex items-center justify-between">
            <h1 className="w-full text-base font-semibold">{formattedPrice}</h1>
            <div className="flex  w-40 items-center gap-5">
              <button
                className="h-10 w-10 rounded-full border border-[--ion-stroke-color] bg-[--ion-item-bg] disabled:opacity-40"
                disabled={bookQuantity === 1}
                onClick={() => handleBookQuantity("remove")}
              >
                -
              </button>
              <h1>{bookQuantity}</h1>
              <button
                disabled={available === false}
                className="h-10 w-10 rounded-full border border-[--ion-stroke-color] bg-[--ion-item-bg]"
                onClick={() => handleBookQuantity("add")}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex">
            <IonButton
              disabled={available === false}
              className="w-full"
              onClick={() => handleAddToCart()}
            >
              {itemExistInCart ? (
                <h1 className="text-white">
                  Added {itemExistInCart.quantity} items to cart
                </h1>
              ) : (
                <h1 className="text-white">{availability}</h1>
              )}
            </IonButton>

            <IonButton className="h-11 w-auto" fill="outline">
              <IonIcon icon={chatboxOutline} />
            </IonButton>

            <IonButton
              className="relative h-11 w-auto rounded-sm"
              fill="outline"
              onClick={() => router.push("/app/orders")}
            >
              <div className="absolute right-[-40%] top-[-20%] z-30 h-auto w-full rounded-full bg-red-600 text-xs text-white lg:right-[-40%] lg:top-[-20%] lg:h-auto">
                <p className="bounce-in">{useCartItemCounter()}</p>
              </div>
              <IonIcon icon={cartOutline} className="relative z-10" />
            </IonButton>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default AddToCartBottomNavigation;
