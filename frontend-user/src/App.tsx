import React, { Suspense, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "./stores/ui";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./index.css";
/* Theme variables */
import "./theme/variables.css";
import Auth from "./pages/Auth/Auth";
import { RootState, useTypedSelector } from "./stores";
import CheckApp from "./utils/checkApp";

const load = (Component: any) => (props: any) => (
  <Suspense
    fallback={
      <div className="absolute z-[1000] grid  h-screen w-full place-items-center bg-[--ion-background-color]">
        <div className="flex items-center space-x-4">
          <IonSpinner name="crescent" className="size-14" />
          <h1 className="text-black dark:text-white">Please wait...</h1>
        </div>
      </div>
    }
  >
    <Component {...props} />
  </Suspense>
);
// pages

const Welcome = load(React.lazy(() => import("./pages/Welcome/Welcome")));
const Tabs = load(React.lazy(() => import("./components/layout/Tabs")));
const Restaurants = load(
  React.lazy(() => import("./pages/Restaurants/Restaurants")),
);
const RestaurantsDetailPage = load(
  React.lazy(() => import("./pages/Restaurants/pages/RestaurantsDetailPage")),
);

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
    dispatch(setDarkMode(shouldAdd));
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    toggleDarkTheme(prefersDark.matches);
    prefersDark.addEventListener("change", (mediaQuery) =>
      toggleDarkTheme(mediaQuery.matches),
    );
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet animated={false}>
          <Route exact path={"/welcome"}>
            <Welcome />
          </Route>
          <Route path={"/app"} component={Tabs} />
          <Route exact path="/restaurants" render={() => <Restaurants />} />
          <Route
            exact
            path="/restaurants/:categoryId/:id"
            render={() => <RestaurantsDetailPage />}
          />

          <Route
            exact
            path={"/app/:restaurantId/:mejaId"}
            render={() => <Auth />}
          />
          <Route exact path="/">
            <Redirect to={"/app/:restaurantId/:mejaId"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
