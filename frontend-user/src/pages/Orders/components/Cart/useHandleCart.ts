import { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../../stores";
import { clearCart } from "../../../../stores/cart/cart";
import { useCreateOrder } from "../../../../services/order/order.query";
import toast from "react-hot-toast";
import {
  FoodCart,
  OrderItem,
  OrderPayload,
} from "../../../../interface/global";

const useHandleCart = () => {
  const dispatch = useTypedDispatch();
  const { cart } = useTypedSelector(({ cart }) => cart);
  const { user, mejaData, restaurantProfile } = useTypedSelector(
    ({ user }) => user,
  );

  const { foodItems } = cart;

  const [cartItems, setCartItems] = useState<FoodCart[]>();

  const { mutate, isPending, isSuccess } = useCreateOrder({
    onSuccess: (data) => {
      setCartItems([]);
      dispatch(clearCart());
      toast.success("Order created successfully");
    },
    onError: (err) => {
      toast.error("Error Creating Order");
      console.log(err);
    },
  });

  const handleOrderSubmission = (paymentMethod: "cashier" | "online") => {
    // if (user?.mejaId && user?.restaurantId)
    //   // mutate({
    //   // });

    const orderPayload: OrderPayload = {
      customerEmail: user?.customerEmail,
      customerName: user?.customerName,
      mejaId: mejaData?.id!,
      paymentMethod,
      items: cartItems!.map((item) => {
        return {
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price,
          notes: item.note,
          additionalIds: item.additionalIds,
        } as OrderItem;
      }),
    };

    mutate({
      data: orderPayload,
    });
  };

  useEffect(() => {
    setCartItems([...foodItems]);
  }, [cart]);

  return { handleOrderSubmission };
};

export default useHandleCart;
