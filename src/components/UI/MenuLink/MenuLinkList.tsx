import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";
import MenuLinkItem from "./MenuLinkItem";

import "swiper/css/free-mode";

type router = {
  path: string;
  label: string;
};

const routerLink: router[] = [
  {
    path: "/facilities",
    label: "Facilities",
  },
  {
    path: "/makeuproom",
    label: "Makeup Room",
  },
  {
    path: "/amenities",
    label: "Amenities",
  },
  {
    path: "/restaurants",
    label: "Foods",
  },
  {
    path: "/events",
    label: "Events",
  },
  {
    path: "/feedback",
    label: "Feedback",
  },
];

const MenuLinkList = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      freeMode={true}
      spaceBetween={16}
      modules={[FreeMode]}
      style={{ marginLeft: "20px", overflow: "visible" }}
    >
      {routerLink.map((router) => (
        <SwiperSlide style={{ width: "auto" }} key={router.path}>
          <MenuLinkItem props={router} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MenuLinkList;
