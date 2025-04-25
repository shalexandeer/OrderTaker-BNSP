import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { useTypedSelector } from "../../stores";
import { memo, useEffect, useState } from "react";

const Welcome = memo(() => {
  const { user, mejaData, restaurantProfile } = useTypedSelector(
    ({ user }) => user,
  );

  const { loading } = useTypedSelector(({ ui }) => ui);
  const [isVisible, setIsVisible] = useState(true);
  const router = useIonRouter();

  const handleRedirect = () => {
    router.push("/app/menu");
  };

  useIonViewDidEnter(() => {
    setIsVisible(true);
  });

  useIonViewDidLeave(() => {
    setIsVisible(false);
  });

  useEffect(() => {
    if (user == null || mejaData == null || restaurantProfile == null) {
      window.location.replace("/");
    }
  }, [mejaData, restaurantProfile, user]);

  if (!isVisible) return null;

  return (
    <IonPage>
      <>
        <IonHeader
          translucent={true}
          className="absolute flex justify-end p-5 uppercase text-[--ion-color-primary] shadow-none"
        >
          {mejaData?.number} {mejaData?.location}
        </IonHeader>
        <IonContent className="fade-in grid h-screen place-items-center space-y-5">
          <div className="mt-16 flex flex-col items-center gap-8 px-5">
            <h1 className="text-center text-2xl font-bold text-[--ion-color-primary]">
              {restaurantProfile?.name}
            </h1>
            <p>{restaurantProfile?.branch}</p>
          </div>
          <IonButton
            className="w-full rounded-xl p-4 text-[--ion-color-primary] disabled:opacity-50"
            onClick={handleRedirect}
          >
            Explore Menu
            <IonSpinner
              name="crescent"
              className={loading ? "block" : "hidden"}
            />
          </IonButton>
        </IonContent>
      </>
    </IonPage>
  );
});

export default Welcome;
