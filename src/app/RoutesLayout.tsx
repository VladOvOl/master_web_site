import { Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import MapPage from "../pages/map_page/MapPage";
import RouteGuard from "./middleware/PrivateGuard";
import PublicGuard from "./middleware/PublickGuard";
import { useAuth } from "../providers/auth/AuthProvider";
import SettingsPage from "../pages/SettingsPage";
import AuthPage from "../pages/auth_page/AuthPage";
import ChatPage from "../pages/chat_page/ChatPage";
import CreatePointFeature from "../feature/map/CreatePointFeature";
import SettingsMapFeature from "../feature/map/SettingsMapFeature";
import DetailPointFeature from "../feature/map/DetailsPointFeature";

function RoutesLayout() {

    const {isAuth} = useAuth()

    return (
        <Routes>
            <Route element={<PublicGuard isAuth={isAuth} />}>
                <Route path="/auth" element={<AuthPage/>}/>
            </Route>

            <Route element={<RouteGuard isAuth={isAuth} />}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/map" replace />} />
                    <Route path="map" element={<MapPage />}>
                        <Route path="createPoint" element={<CreatePointFeature/>} />
                        <Route path="settingsMap" element={<SettingsMapFeature/>} />
                        <Route path=":pointId" element={<DetailPointFeature />} />
                    </Route>
                    <Route path="settings" element={<SettingsPage/>} />
                    <Route path="chat" element={<ChatPage/>} />
                </Route>
            </Route>
        </Routes>
    );
}

export default RoutesLayout;
