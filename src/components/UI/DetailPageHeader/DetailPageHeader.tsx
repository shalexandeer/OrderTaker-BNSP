import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonRow,
  IonToolbar,
} from "@ionic/react";

interface DetailPageHeaderProps {
  defaultHref?: string;
}

const DetailPageHeader = ({ defaultHref }: DetailPageHeaderProps) => {
  return (
    <IonHeader className="shadow-none">
      <IonRow>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={defaultHref} />
          </IonButtons>
        </IonToolbar>
      </IonRow>
    </IonHeader>
  );
};

export default DetailPageHeader;
