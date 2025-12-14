import { Navigate, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import RouteGuard from "./middleware/PrivateGuard";
import PublicGuard from "./middleware/PublickGuard";
import { useAuth } from "../providers/auth/AuthProvider";
import { lazy, Suspense } from "react";

const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const SettingsMapFeature = lazy(() => import("../feature/map/SettingsMapFeature"));
const CreatePointFeature = lazy(() => import("../feature/map/CreatePointFeature"));
const DetailPointFeature = lazy(() => import("../feature/map/DetailsPointFeature"));
const ChatPage = lazy(() => import("../pages/chat_page/ChatPage"));
const AuthPage = lazy(() => import("../pages/auth_page/AuthPage"));
const MapPage = lazy(() => import("../pages/map_page/MapPage"));

function RoutesLayout() {

    const {isAuth} = useAuth()

    return (
        <Suspense fallback={null}>
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
        </Suspense>
    );
}

export default RoutesLayout;
