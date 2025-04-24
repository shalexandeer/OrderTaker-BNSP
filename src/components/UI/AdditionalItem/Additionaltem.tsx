import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Additional, FoodCart } from "../../../interface/global";

interface AdditionaltemProps {
  additional: Additional[] | null;
  handleAdditional: (id: string, name: string, price: number) => void;
  handleUncheckedAdditional: (callback: () => void) => void;
  itemExistInCart: FoodCart | undefined;
}

const Additionaltem: React.FC<AdditionaltemProps> = (props) => {
  const {
    additional,
    handleAdditional,
    handleUncheckedAdditional,
    itemExistInCart,
  } = props;
  1;
  const [existingQty, setExistingQty] = useState(0);
  const checkboxRefs: React.RefObject<HTMLIonCheckboxElement>[] = []; // Array to hold checkbox refs

  const handleCheckbox = (
    e: BaseSyntheticEvent,
    id: string,
    name: string,
    price: number,
  ) => {
    const checked = e.target.checked;
    if (checked) {
      handleAdditional(id, name, price);
    } else {
      handleAdditional(id, name, -price);
    }
  };

  useEffect(() => {
    if (itemExistInCart) {
      setExistingQty(itemExistInCart.quantity);
    }
    if (existingQty !== itemExistInCart?.quantity) {
      handleUncheckedAdditional(() => {
        checkboxRefs.forEach((item) => {
          item.current!.checked = false;
        });
      });
    }
  }, [itemExistInCart]);

  return (
    <div className="grid">
      {!!additional &&
        additional.map((add) => {
          const { id, name, price } = add;
          const checkboxRef = useRef<HTMLIonCheckboxElement>(null); // Create a ref for each checkbox
          checkboxRefs.push(checkboxRef); // Push the ref to the array
          return (
            <IonItem key={id} className="space-x-3">
              <IonCheckbox
                legacy={false}
                value={name}
                onClick={(e) => handleCheckbox(e, id, name, price)}
                ref={checkboxRef}
              />
              <IonLabel>{name}</IonLabel>
              <p className="text-[--ion-color-primary]">Rp. {price}</p>
            </IonItem>
          );
        })}
    </div>
  );
};

export default Additionaltem;
