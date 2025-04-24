import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { callOutline } from "ionicons/icons";

const PageListHeader = ({
  headerFor,
  defaultHref = "/app/home",
  call,
}: {
  headerFor: string;
  defaultHref?: string;
  call?: boolean;
}) => {
  return (
    <IonHeader translucent={true} className="shadow-none">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={defaultHref} />
        </IonButtons>
        <IonTitle>{headerFor}</IonTitle>
        {!!call && (
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={callOutline} />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default PageListHeader;
