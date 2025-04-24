import React, { useEffect } from "react";
import { useTypedSelector } from "../stores";
import { useIonRouter } from "@ionic/react";

const CheckApp = () => {
  const router = useIonRouter();
  const { user } = useTypedSelector(({ user }) => user);
  const { profile } = useTypedSelector(({ hotel }) => hotel);

  useEffect(() => {
    if (!profile && user) {
      router.push(`/app/${user.hotelId}/${user.placeType}/${user.no}`);
    }
  }, [profile, user]);
};

export default CheckApp;
