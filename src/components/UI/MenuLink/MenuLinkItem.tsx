import { Link } from "react-router-dom";
import MenuLinkIcons from "../../elements/Icons/MenuLinkIcons";

interface MenuLinkItemProps {
  props: {
    path: string;
    label: string;
  };
}

const MenuLinkItem = ({ props }: MenuLinkItemProps) => {
  const { path, label } = props;

  return (
    <Link to={path}>
      <div className="flex flex-col items-center space-y-2">
        <div className="grid h-[68.75px] w-[68.75px] place-items-center rounded-xl border border-[--ion-stroke-color] bg-[--ion-item-bg]">
          <MenuLinkIcons iconType={label.replace(" ", "")} />
        </div>
        <p className="text-xs font-semibold">{label}</p>
      </div>
    </Link>
  );
};

export default MenuLinkItem;
