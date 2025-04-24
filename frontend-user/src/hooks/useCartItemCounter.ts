import { FoodCart } from "../interface/global";
import { useTypedSelector } from "../stores";

const useCartItemCounter = () => {
  const { cart } = useTypedSelector(({ cart }) => cart);
  const { foodItems } = cart;

  // Map through each array and sum up the quantities
  const totalCartItems = [
    ...foodItems?.map((item: FoodCart) => item.quantity),
  ].reduce((total, qty) => total + qty, 0);

  return totalCartItems;
};

export default useCartItemCounter;
