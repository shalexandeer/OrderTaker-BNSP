import React from "react";
import { useSelector } from "react-redux";

import {
  AmenitiesIcon,
  EventsIcon,
  FacilitiesIcon,
  FeedbackIcon,
  FoodsIcon,
  MakeUpRoomIcon,
} from "./IconLibrary";
import { RootState } from "../../../stores";

interface IconProps {
  stroke?: string;
  fill?: string;
}

type IconComponentType = React.FC<IconProps>;

const iconComponents: Record<string, IconComponentType> = {
  Facilities: FacilitiesIcon,
  MakeupRoom: MakeUpRoomIcon,
  Amenities: AmenitiesIcon,
  Foods: FoodsIcon,
  Feedback: FeedbackIcon,
  Events: EventsIcon,
};

interface MenuLinkIconsProps {
  iconType: keyof typeof iconComponents;
}

const MenuLinkIcons: React.FC<MenuLinkIconsProps> = ({ iconType }) => {
  const { dark } = useSelector((state: RootState) => state.ui);

  const IconComponent = iconComponents[iconType];
  const iconColor = dark ? "#ffffff" : "#1E1E1E";

  return IconComponent ? (
    <IconComponent stroke={iconColor} fill={iconColor} />
  ) : null;
};

export default MenuLinkIcons;
