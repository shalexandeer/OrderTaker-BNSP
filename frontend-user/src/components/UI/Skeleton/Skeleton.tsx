import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonSkeletonText,
  IonToolbar,
} from "@ionic/react";
import { callOutline, chatboxOutline } from "ionicons/icons";

function SkeletonDetailPage() {
  return (
    <>
      <IonContent>
        <div className="mt-4 space-y-6 px-5">
          <div className="h-[173px]">
            <IonSkeletonText
              animated={true}
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            ></IonSkeletonText>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "80px",
                    height: "20px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
              </h1>

              <p className="text-[--ion-color-primary]">
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "80px",
                    height: "20px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
              </p>
            </div>
            <p className={`text-justify text-sm text-[--ion-paragraph-color]`}>
              <IonSkeletonText
                animated={true}
                style={{
                  height: "20px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                style={{
                  height: "20px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
              <IonSkeletonText
                animated={true}
                style={{
                  height: "20px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
            </p>
          </div>
          <div className="space-y-2">
            <h1 className="text-sm font-bold">
              <IonSkeletonText
                animated={true}
                style={{
                  width: "80px",
                  height: "20px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
            </h1>
            <div>
              <IonSkeletonText
                animated={true}
                style={{
                  height: "150px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-sm font-bold">
              <IonSkeletonText
                animated={true}
                style={{
                  width: "80px",
                  height: "20px",
                  borderRadius: "12px",
                }}
              ></IonSkeletonText>
            </h1>
            <IonSkeletonText
              animated={true}
              style={{
                height: "143px",
                borderRadius: "12px",
              }}
            ></IonSkeletonText>
          </div>
        </div>
      </IonContent>
      <IonFooter translucent={true}>
        <IonToolbar className="bg-[--ion-item-bg]">
          <div className="space-y-1 px-5 py-2">
            <div className="flex items-center justify-between">
              <h1 className="w-full text-base font-semibold">
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "80px",
                    height: "20px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
              </h1>
              <div className="flex  w-40 items-center gap-5">
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                  }}
                ></IonSkeletonText>
              </div>
            </div>
            <div className="flex">
              <IonButton className="w-full" disabled>
                <h1 className="text-white">Add to cart</h1>
              </IonButton>
              <IonButton
                className="h-11 w-auto rounded-sm"
                disabled
                fill="outline"
              >
                <IonIcon icon={callOutline} />
              </IonButton>
              <IonButton className="h-11 w-auto" disabled fill="outline">
                <IonIcon icon={chatboxOutline} />
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default SkeletonDetailPage;
