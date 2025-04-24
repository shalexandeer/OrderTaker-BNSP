import { IonImg } from "@ionic/react";

interface DetailPageImageProps {
  imageUrl: string;
}

const DetailPageImage = ({ imageUrl }: DetailPageImageProps) => {
  return (
    <IonImg
      src={imageUrl}
      alt="Detail Page Image"
      className="h-[173px] w-full rounded-xl border border-[--ion-stroke-color]"
      style={{
        objectFit: "cover",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default DetailPageImage;
