import { IonImg, useIonRouter } from "@ionic/react";
import { BASE_URL_IMG } from "../../../services/url";
import { Food } from "../../../interface/global";

interface SearchItemProps {
  searchData: Food[];
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
                src={`${BASE_URL_IMG}/${img}`}
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
