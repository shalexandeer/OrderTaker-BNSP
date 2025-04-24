import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<any>;
  [key: string]: any;
}) => {
  const profile = null; // Replace with actual profile check
  const user = null; // Replace with actual user check

  return (
    <Route
      {...rest}
      render={(props) =>
        profile && user ? <Component {...props} /> : <Redirect to="/auth" />
      }
    />
  );
};
