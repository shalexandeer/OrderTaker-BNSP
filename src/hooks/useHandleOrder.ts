import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addToCart, updateNotes } from "../stores/cart/cart";
import toast from "react-hot-toast";
import { Additional, FoodCart } from "../interface/global";

interface UseHandleOrderProps {
  bookQuantity: number;
  totalPrice: number;
  notes: string;
  handleNotes: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  handleBookQuantity: (action: "add" | "remove") => void;
  handleAddToCart: () => void;
  handleAdditional: (id: string, name: string, price: number) => void;
  handleUncheckedAdditional: (callback: () => void) => void;
}

const useHandleOrder = (
  selectedItem: {
    foodId: string;
    name: string;
    price: number;
  } | null,
  from: "food",
  existingNotes: string,
): UseHandleOrderProps => {
  const { foodId, name, price } = selectedItem!;

  const [state, setState] = useState({
    bookQuantity: 1 as number,
    totalPrice: price as number,
    additional: [] as Additional[],
    notes: existingNotes as string,
  });

  const dispatch = useDispatch();
  const { bookQuantity, totalPrice, notes, additional } = state;

  const handleNotes = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setState((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  useEffect(() => {
    const debounceDispatch = setTimeout(() => {
      if (existingNotes && existingNotes !== notes) {
        dispatch(updateNotes({ from, foodId, note: notes }));
        toast.success("Notes updated");
      }
    }, 1000);

    return () => clearTimeout(debounceDispatch);
  }, [notes, existingNotes, from, foodId, dispatch]);

  const handleBookQuantity = useCallback(
    (action: "add" | "remove") => {
      if (additional.length > 0) {
        const additionalPrice = additional
          .map((item) => item.price)
          .reduce((a, b) => a + b);
        setState((prev) => ({
          ...prev,
          totalPrice:
            action === "add"
              ? prev.totalPrice + additionalPrice + price
              : prev.totalPrice - additionalPrice - price,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          totalPrice:
            action === "add"
              ? prev.totalPrice + price
              : prev.totalPrice - price,
        }));
      }
      setState((prev) => ({
        ...prev,
        bookQuantity:
          action === "add" ? prev.bookQuantity + 1 : prev.bookQuantity - 1,
      }));
    },
    [bookQuantity, totalPrice, price, additional],
  );

  const handleAdditional = useCallback(
    (id: string, name: string, price: number) => {
      const additionalAdded = additional.find((item) => item.id === id);

      setState((prev) => ({
        ...prev,
        totalPrice: prev.totalPrice + price * bookQuantity,
      }));

      if (additionalAdded) {
        setState((prev) => ({
          ...prev,
          additional: prev.additional.filter((item) => item.id !== id),
        }));
      } else {
        setState((prev) => ({
          ...prev,
          additional: [...prev.additional, { id, name, price, foodId }],
        }));
      }
    },
    [additional, bookQuantity],
  );

  const handleUncheckedAdditional = (callback: () => void) => {
    callback();
  };

  const handleAddToCart = useCallback(async () => {
    const totalAdditional = additional.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    const itemToAdd: FoodCart = {
      foodId,
      name,
      note: notes,
      price: price + totalAdditional,
      quantity: bookQuantity,
      additionalIds: [...additional.map((item) => item.id)],
      from: "food",
    };

    switch (from) {
      case "food":
        itemToAdd.foodId = foodId;
        break;
      default:
        break;
    }

    dispatch(addToCart(itemToAdd));

    handleUncheckedAdditional;

    setState({
      bookQuantity: 1,
      totalPrice: price,
      additional: [],
      notes,
    });
  }, [
    state,
    selectedItem,
    dispatch,
    price,
    from,
    foodId,
    name,
    additional,
    notes,
    bookQuantity,
    totalPrice,
  ]);

  return {
    bookQuantity,
    totalPrice,
    notes,
    handleNotes,
    handleBookQuantity,
    handleAddToCart,
    handleAdditional,
    handleUncheckedAdditional,
  };
};

export default useHandleOrder;
