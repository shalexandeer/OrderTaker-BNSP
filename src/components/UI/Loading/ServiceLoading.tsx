import { IonContent, IonPage } from "@ionic/react";
import PageListHeader from "../PageListHeader/PageListHeader";

const ServiceLoading = () => {
  return (
    <IonPage>
      <PageListHeader headerFor="" />
      <IonContent>
        <div className="grid h-screen w-full place-items-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-[--ion-color-primary]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-[--ion-color-primary]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-[--ion-color-primary]"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ServiceLoading;
