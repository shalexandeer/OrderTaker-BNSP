import { Route } from "react-router-dom";
import { useTypedSelector } from "../stores";
import { useEffect } from "react";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
}) => {
  return (
    <Route exact path={path} render={(props) => <Component {...props} />} />
  );
};
