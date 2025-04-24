import { IonFab, IonFabButton, IonIcon, useIonRouter } from "@ionic/react";
import { cart } from "ionicons/icons";
import useCartItemCounter from "../../../hooks/useCartItemCounter";

const IonFabCart = () => {
  const router = useIonRouter();
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton
        className="bounce-in relative"
        onClick={() => router.push("/app/orders")}
      >
        <IonIcon icon={cart}></IonIcon>
        <div className="absolute right-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
          {useCartItemCounter()}
        </div>
      </IonFabButton>
    </IonFab>
  );
};

export default IonFabCart;
