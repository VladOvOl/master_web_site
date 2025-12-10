import { Navigate, Outlet } from "react-router";


interface Props {
  isAuth: boolean;
}

const PublicGuard: React.FC<Props> = ({ isAuth }) => {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicGuard;