import { IonButton, IonInput, IonSpinner, useIonAlert } from "@ionic/react";
import { useTypedDispatch, useTypedSelector } from "../../../../stores";
import CartItems from "./CartItems";
import { memo } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "../../../../utils/string";
import { FoodCart } from "../../../../interface/global";
import { setUser } from "../../../../stores/user";
import useHandleCart from "./useHandleCart";

interface CartListProps {
  from?: string;
}

const paymentMethods = [
  {
    method: "cashier",
    label: "Charge in Cashier",
    description: "Your bill will be charged in the cashier",
  },
  {
    method: "online",
    label: "Online Payment",
    description: "Easily pay with bank transfer or credit card",
  },
];

const CartList: React.FC<CartListProps> = ({}) => {
  const { loading } = useTypedSelector(({ ui }) => ui);
  const { handleOrderSubmission } = useHandleCart();
  const { user, mejaData } = useTypedSelector(({ user }) => user);
  const { cart } = useTypedSelector(({ cart }) => cart);
  const { foodItems } = cart;
  const dispatch = useTypedDispatch();

  const activeClass = "border-[--ion-color-primary] text-[--ion-color-primary]";
  const inactiveClass = "border-gray-400 text-gray-600";

  const [presentAlert] = useIonAlert();

  const canSendOrders = foodItems.length > 0 ? true : false;

  const cartIsEmpty = cart?.foodItems.length === 0;

  const isDisabled: boolean =
    !user.paymentMethod || !user.customerEmail || !user.customerName;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Cart</h1>

      {cart?.foodItems.map((order: FoodCart) => (
        <CartItems key={order.foodId} order={order} from={"food"} />
      ))}
      {cartIsEmpty && <p>Cart is empty</p>}

      <div className="h-[0.5px] w-full bg-gray-500 " />
      <div className="flex justify-between">
        <h1 className="text-base font-semibold">Total</h1>
        <h1 className="text-base font-semibold">
          {formatPrice(totalPriceEachOrder(foodItems))}
        </h1>
      </div>

      <div className="grid gap-4">
        <IonInput
          label="Name"
          labelPlacement="floating"
          fill="outline"
          value={user?.customerName || ""}
          onIonChange={(e) => {
            const name = e.detail.value || "";
            if (user) {
              const updatedUser = { ...user, customerName: name };
              dispatch(setUser(updatedUser));
            }
          }}
          placeholder="Enter Name"
        ></IonInput>
        <IonInput
          label="Email"
          labelPlacement="floating"
          fill="outline"
          value={user?.customerEmail || ""}
          onIonChange={(e) => {
            const email = e.detail.value || "";
            if (user) {
              const updatedUser = { ...user, customerEmail: email };
              dispatch(setUser(updatedUser));
            }
          }}
          placeholder="Enter Email"
        ></IonInput>
        <IonInput
          label="Table"
          labelPlacement="floating"
          fill="outline"
          disabled
          value={mejaData?.number}
          placeholder="Enter Phone Number"
        ></IonInput>
      </div>

      <div className="grid gap-4">
        <h1 className="text-lg font-semibold">Payment Method</h1>
        <div className="grid grid-cols-2 gap-2">
          {paymentMethods.map(({ method, label, description }) => (
            <div
              key={method}
              className={`relative border p-2 ${
                user.paymentMethod === method ? activeClass : inactiveClass
              }`}
              onClick={() => {
                const updatedUser = {
                  ...user,
                  paymentMethod: method as "cashier" | "online",
                };
                dispatch(setUser(updatedUser));
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={user.paymentMethod === method}
                onChange={() => {
                  const updatedUser = {
                    ...user,
                    paymentMethod: method as "cashier" | "online",
                  };
                  dispatch(setUser(updatedUser));
                }}
                className="absolute right-2 top-2"
              />
              <p className="text-[12px]">{label}</p>
              <p className="text-[12px]">{description}</p>
            </div>
          ))}
        </div>
      </div>

      <IonButton
        expand="block"
        disabled={!canSendOrders || isDisabled}
        onClick={() => {
          presentAlert({
            header: "Confirm order?",
            message: "Check your order before you proceed to send it",
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
              },
              {
                text: "Send Order",
                handler: () => {
                  if (!isDisabled) {
                    handleOrderSubmission(user?.paymentMethod);
                  } else
                    toast.error(
                      "Please fill all details before sending orders",
                    );
                },
              },
            ],
          });
        }}
      >
        Send Orders
        {loading && <IonSpinner name="crescent" />}
      </IonButton>
    </div>
  );
};

export default memo(CartList);

export function totalPriceEachOrder(foodItems: FoodCart[]) {
  let total = 0;
  if (foodItems && foodItems.length > 0) {
    foodItems.forEach((item) => {
      if (isNaN(item.price)) {
        total += 0;
      } else {
        total += item.price * item.quantity;
      }
    });
  }

  return total;
}
