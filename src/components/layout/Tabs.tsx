import React, { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonSpinner,
} from "@ionic/react";

import { cartOutline, chatboxOutline, homeOutline } from "ionicons/icons";
import { ProtectedRoute } from "../../routes/ProtectedRoute";

const load = (Component: any) => (props: any) => (
  <Suspense
    fallback={
      <div className="absolute z-[1000] grid  h-screen w-full place-items-center bg-[--ion-background-color]">
        <div className="flex items-center space-x-4">
          <IonSpinner name="crescent" className="size-14" />
          <h1>Please wait...</h1>
        </div>
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);

const Home = load(React.lazy(() => import("../../pages/Home/Home")));
const Orders = load(React.lazy(() => import("../../pages/Orders/Orders")));

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet animated={false}>
        <ProtectedRoute path="/app/menu" component={Home} />
        <ProtectedRoute path="/app/orders" component={Orders} />
        <Route exact path="/app">
          <Redirect to={"/app/home"} />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/menu">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="orders" href="/app/orders">
          <IonIcon aria-hidden="true" icon={cartOutline} />
          <IonLabel>Your Order</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
