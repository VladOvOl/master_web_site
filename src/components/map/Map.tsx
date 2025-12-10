import React, { useRef, useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import type { IPoint } from "../../feature/map/MapFeature";
import { Link } from "react-router";

export type INewPoint = {
    latitude: number;
    longitude: number;
};

type IProps = {
    selectingPoint: boolean;
    setSelectingPoint: React.Dispatch<React.SetStateAction<boolean>>;
    newPoint: INewPoint;
    setNewPoint: React.Dispatch<React.SetStateAction<INewPoint>>;
    aidPoints: IPoint[];
};

const MapWithMarkersAndRoute = ({
    selectingPoint,
    newPoint,
    setNewPoint,
    setSelectingPoint,
    aidPoints,
}: IProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const routingRef = useRef<L.Routing.Control | null>(null);

    const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
    const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
    const [mapReady, setMapReady] = useState(false);

    // Новый стейт только для маршрута
    const [routePoint, setRoutePoint] = useState<INewPoint | null>(null);

    /** Хук для кликов по карте */
    function MapClickHandler() {
        useMapEvents({
            click(e) {
                if (!selectingPoint) return;
                setNewPoint({
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng,
                });
                setSelectedPointId(null);
                setSelectingPoint(false);
            },
        });
        return null;
    }

    /** Получение текущего местоположения пользователя */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const loc = L.latLng(pos.coords.latitude, pos.coords.longitude);
                setUserLocation(loc);
                console.log("geo ok:", pos.coords.latitude, pos.coords.longitude);

                if (mapRef.current) {
                    mapRef.current.setView(loc, 14);
                }
            },
            () => console.warn("Геолокация недоступна"),
            { enableHighAccuracy: true }
        );
    }, []);

    /** Эффект для центрирования карты на пользователе или выбранной точке */
    useEffect(() => {
        if (!mapRef.current) return;

        const target = newPoint
            ? L.latLng(newPoint.latitude, newPoint.longitude)
            : userLocation;

        if (mapReady && target) {
            mapRef.current.flyTo(target, 14, { animate: true });
        }
    }, [mapReady, userLocation, newPoint]);

    /** Компонент для построения маршрута */
    const Routing = () => {
        const map = useMap();

        useEffect(() => {
            if (!map || !userLocation || !routePoint) return;
            if (!userLocation.lat || !userLocation.lng || !routePoint.latitude || !routePoint.longitude)
                return;

            const control = L.Routing.control({
                waypoints: [
                    userLocation,
                    L.latLng(routePoint.latitude, routePoint.longitude),
                ],
                routeWhileDragging: false,
                showAlternatives: false,
                draggableWaypoints: false,
                addWaypoints: false,
            }).addTo(map);

            map.flyTo(L.latLng(routePoint.latitude, routePoint.longitude), 14);

            return () => control.remove();
        }, [map, userLocation, routePoint]);

        return null;
    };

    return (
        <div style={{ height: "100%", width: "100%"}}>
            {userLocation ? (
                <MapContainer
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={14}
                    style={{ height: "100%", width: "100%",borderRadius:10 }}
                    whenCreated={(mapInstance) => {
                        mapRef.current = mapInstance;
                        setMapReady(true);
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <MapClickHandler />
                    <Marker position={userLocation}>
                        <Popup>Вы здесь</Popup>
                    </Marker>
                    {aidPoints.map((p) => (
                        <Marker
                            key={p.id}
                            position={[p.location.latitude, p.location.longitude]}
                            eventHandlers={{
                                click: () => {
                                    setSelectedPointId(p.id);
                                    setRoutePoint({
                                        latitude: p.location.latitude,
                                        longitude: p.location.longitude,
                                    }); // только для маршрута
                                },
                                popupclose: () => {
                                    if (selectedPointId === p.id) {
                                        setSelectedPointId(null);
                                        setRoutePoint(null); // маршрут исчезнет
                                    }
                                },
                            }}
                        >
                            <Popup>
                                <>
                                    {p.name}
                                    <Link to={`/map/${p.id}`}>Перейти</Link>
                                </>
                            </Popup>
                        </Marker>
                    ))}
                    {newPoint && (
                        <Marker
                            position={[newPoint.latitude, newPoint.longitude]}
                        />
                    )}
                    {routePoint && <Routing />}
                </MapContainer>
            ) : (
                <div>Загрузка карты...</div>
            )}
        </div>
    );
};

export default MapWithMarkersAndRoute;
