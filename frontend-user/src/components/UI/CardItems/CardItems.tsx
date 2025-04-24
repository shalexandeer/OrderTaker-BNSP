import { IonImg } from "@ionic/react";
import { BASE_URL } from "../../../services/url";

interface CardItemsProps {
  item: Amenities | Foods | Facilities | Events | MakeUpRoom;
  onClick: (id: number, foodCategoryId: number) => void;
}

const CardItems = ({ item, onClick }: CardItemsProps) => {
  const { id, name, img, categoryId } = item;

  return (
    <div
      className="flex flex-col items-center gap-2"
      onClick={() => {
        if (onClick) {
          onClick(id, categoryId);
        }
      }}
    >
      <div className="relative min-h-[120px] w-full overflow-hidden rounded-xl border border-[--ion-stroke-color] lg:h-auto lg:min-h-64">
        <IonImg
          src={`${BASE_URL}/files/${img}`}
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
        />
      </div>

      <p>{name}</p>
    </div>
  );
};

export default CardItems;
