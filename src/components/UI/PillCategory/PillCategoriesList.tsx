import { useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PillButton } from "../../elements/PillButton/PillButton";
import { IonSkeletonText } from "@ionic/react";
import { Category } from "../../../interface/global";

interface PillCategoriesListProps {
  items: Category[] | null;
  loadingCategory: boolean;
  selectedCategory: string | null;
  onClick: (id: string | null) => void;
}

const PillCategoriesList = ({
  items,
  loadingCategory,
  selectedCategory,
  onClick,
}: PillCategoriesListProps) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      modules={[FreeMode]}
      spaceBetween={8}
      style={{ marginLeft: "20px", overflow: "visible" }}
    >
      <SwiperSlide style={{ width: "auto" }} key={121381208}>
        <PillButton
          variant={selectedCategory === null ? "active" : undefined}
          onClick={() => {
            onClick(null);
          }}
        >
          All Category
        </PillButton>
      </SwiperSlide>

      {items !== null
        ? items?.map((menu) => (
            <SwiperSlide style={{ width: "auto" }} key={menu.id}>
              <PillButton
                variant={menu.id === selectedCategory ? "active" : undefined}
                onClick={() => {
                  onClick(menu.id);
                }}
              >
                {menu.name}
              </PillButton>
            </SwiperSlide>
          ))
        : null}

      {items === null || loadingCategory
        ? Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide className="pb-1" style={{ width: "auto" }} key={index}>
              <IonSkeletonText
                animated
                className=" h-[40px] w-16 rounded-full"
              ></IonSkeletonText>
            </SwiperSlide>
          ))
        : null}
    </Swiper>
  );
};

export default PillCategoriesList;
