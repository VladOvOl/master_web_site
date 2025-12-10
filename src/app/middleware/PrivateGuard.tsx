import { Navigate, Outlet } from "react-router";


interface Props {
  isAuth: boolean;
}

const RouteGuard: React.FC<Props> = ({ isAuth }) => {
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;