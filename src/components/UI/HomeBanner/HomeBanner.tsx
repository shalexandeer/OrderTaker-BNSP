import { IonButton, useIonRouter } from "@ionic/react";
import MenuLinkIcons from "../../elements/Icons/MenuLinkIcons";

interface HomeBannerProps {
  props: {
    heading: string;
    paragraph: string;
    buttonText: string;
    link: string;
  };
}

const HomeBanner = ({ props }: HomeBannerProps) => {
  const { heading, paragraph, buttonText, link } = props;
  const router = useIonRouter();
  return (
    <div className="mx-5 max-w-[410px] space-y-4 rounded-lg border border-[--ion-stroke-color] p-3">
      <div className="flex gap-3">
        <div className="h-full items-center justify-center rounded-full border border-[--ion-stroke-color] bg-[--ion-item-bg] p-2">
          <MenuLinkIcons iconType="Facilities" />
        </div>
        <div className="space-y-2">
          <h1 className="text-[17px] font-semibold">{heading}</h1>
          <p className="text-xs text-[#6B6B6E] dark:text-[--ion-text-color]">
            {paragraph}
          </p>
        </div>
      </div>
      <IonButton expand="block" onClick={() => router.push(link)}>
        {buttonText}
      </IonButton>
    </div>
  );
};

const Heading = ({ heading }: { heading: string }) => {
  return <h1>{heading}</h1>;
};

const Paragraph = ({ paragraph }: { paragraph: string }) => {
  return <p>{paragraph}</p>;
};

HomeBanner.Heading = Heading;
HomeBanner.Paragraph = Paragraph;

export default HomeBanner;
