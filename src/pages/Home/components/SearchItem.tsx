import { IonImg, useIonRouter } from "@ionic/react";
import { BASE_URL } from "../../../services/url";

interface FoodCategorySearch {
  id: number;
  hotelId: number;
  name: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface FoodItemSearch {
  id: number;
  categoryId: number;
  foodCategory: FoodCategorySearch;
  name: string;
  description: string;
  img: string;
  price: number;
  availability: boolean;
  stock: number;
  favorite: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface SearchItemProps {
  searchData: FoodItemSearch[];
  searchText: string;
}

const SearchItem = ({ searchData, searchText }: SearchItemProps) => {
  const router = useIonRouter();

  return (
    <>
      {searchText !== "" && (
        <p className="pb-3">Search results for "{searchText}"</p>
      )}

      <div
        className={`grid grid-cols-2 gap-5 ${
          searchText !== "" ? "" : "hidden"
        }`}
      >
        {searchData?.map(({ id, name, categoryId, img }) => (
          <div className="flex flex-col items-center gap-2" key={id}>
            <div
              onClick={() => {
                router.push(`/restaurants/${categoryId}/${id}`);
              }}
              className="relative min-h-[120px] w-full overflow-hidden rounded-xl border border-[--ion-stroke-color]"
            >
              <IonImg
                src={`${BASE_URL}/files/${img}`}
                className="absolute inset-0 h-full w-full rounded-xl object-cover"
              />
            </div>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchItem;
