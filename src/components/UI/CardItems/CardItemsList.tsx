import { useMemo } from "react";

import { IonCol, IonGrid, IonSpinner, useIonRouter } from "@ionic/react";
import CardItems from "./CardItems";

interface CardItemsListProps {
  items: Amenities[] | Foods[] | Facilities[] | Events[] | MakeUpRoom[] | null;
  activeCategories: number;
  loadingItems: boolean;
}

const CardItemsList = ({
  items,
  activeCategories,
  loadingItems,
}: CardItemsListProps) => {
  const router = useIonRouter();

  const handleRedirectToDetailPage = (id: number, categoryId: number) => {
    router.push(`${window.location.pathname}/${categoryId}/${id}`);
  };

  const filteredItems = useMemo(() => {
    return activeCategories !== 0
      ? items?.filter((item) => item.categoryId === activeCategories)
      : items;
  }, [activeCategories, items]);

  return (
    <>
      {!!loadingItems && (
        <div className="grid place-items-center">
          <IonSpinner name="crescent" className="size-14" />
        </div>
      )}
      <IonGrid className="grid grid-cols-2 gap-2">
        {filteredItems &&
          !loadingItems &&
          filteredItems.map((item, id) => (
            <IonCol key={item.id + id} className="fade-in">
              <CardItems onClick={handleRedirectToDetailPage} item={item} />
            </IonCol>
          ))}

        {filteredItems?.length === 0 && <p>No items found</p>}
      </IonGrid>
    </>
  );
};

export default CardItemsList;
