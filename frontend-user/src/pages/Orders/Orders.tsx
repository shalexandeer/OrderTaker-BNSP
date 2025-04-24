import { memo, useCallback, useEffect } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from "@ionic/react";
import CartList from "./components/Cart/CartList";
import { useTypedSelector } from "../../stores";

const Orders: React.FC = memo(() => {
  const { user, mejaData, restaurantProfile } = useTypedSelector(
    ({ user }) => user,
  );

  const handleRefresh = useCallback(
    (event: CustomEvent<RefresherEventDetail>) => {
      setTimeout(() => {
        event.detail.complete();
      }, 2000);
    },
    [],
  );

  useEffect(() => {
    if (user == null || mejaData == null || restaurantProfile == null) {
      window.location.replace("/");
    }
  }, [mejaData, restaurantProfile, user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="fade-in">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="mt-5 space-y-6 px-5" id="orderItems">
          <CartList />
        </div>
      </IonContent>
    </IonPage>
  );
});

export default Orders;
