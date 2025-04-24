import {
  IonContent,
  IonPage,
  IonSpinner,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RootState, useTypedDispatch, useTypedSelector } from "../../stores";
import { useParams } from "react-router";
import { setIds, setMejaData, setRestaurantProfile } from "../../stores/user";
import { useGetRestaurantProfile } from "../../services/hotel/hotel.query";
import { useGetMejaById } from "../../services/foods copy/meja.query";

const Auth = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { profile } = useTypedSelector((state: RootState) => state.hotel);
  const dispatch = useTypedDispatch();
  const { restaurantId, mejaId } = useParams<{
    restaurantId: string;
    mejaId: string;
  }>();

  const {
    data: restaurantProfile,
    isFetching,
    isError,
  } = useGetRestaurantProfile(restaurantId);

  const { data: mejaData } = useGetMejaById(mejaId);

  const router = useIonRouter();

  useEffect(() => {
    if (restaurantProfile && mejaData) {
      dispatch(
        setIds({
          mejaId,
          restaurantId,
        }),
      );

      dispatch(setRestaurantProfile(restaurantProfile));
      dispatch(setMejaData(mejaData));
    }
  }, [restaurantProfile, dispatch, profile]);

  useEffect(() => {
    if (restaurantProfile && mejaData) {
      router.push("/welcome");
    }
  }, [restaurantProfile, mejaData]);

  useIonViewDidEnter(() => {
    setIsVisible(true);
  });

  useIonViewDidLeave(() => {
    setIsVisible(false);
  });

  if (!isVisible) return null;

  return (
    <IonPage>
      <IonContent className="grid place-content-center">
        <div className="flex h-screen flex-col items-center justify-center space-y-4">
          {!isError && isFetching ? (
            <>
              <IonSpinner name="crescent" className="size-14" />
              <h1>Loading Page...</h1>
            </>
          ) : null}
          {isError && !isFetching ? <p>Scan the QRCode again</p> : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
