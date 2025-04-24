import { IonImg } from "@ionic/react";
import { BASE_URL } from "../../../services/url";
import { formatPrice } from "../../../utils/string";
import { Food } from "../../../interface/global";

interface RestaurantItemProps {
  menu: Food | null;
  loadingFood: boolean;
  onClick?: (id: string, foodCategoryId: string) => void;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ menu, onClick }) => {
  const { id, categoryId, name, price, img, availability } = menu!;

  return (
    <div
      className="fade-in flex items-center gap-3 border-b border-b-[--ion-stroke-color] pb-4 pl-5 pr-5 pt-4"
      onClick={() => {
        if (onClick) {
          onClick(id, categoryId);
        }
      }}
    >
      <div className="relative">
        <IonImg
          src={`${BASE_URL}/files/${img}`}
          className="h-[72px] w-[72px] border border-[--ion-stroke-color]"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        />
        {!availability && (
          <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black bg-opacity-50">
            <p className="text-[9px] text-white">Not Available</p>
          </div>
        )}
      </div>
      <div className="grid">
        <h1 className="text-base font-bold">{name}</h1>
        <p className="text-sm font-semibold text-[--ion-color-primary]">
          {formatPrice(price)}
        </p>
      </div>
    </div>
  );
};

export default RestaurantItem;
