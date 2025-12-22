import MapWithMarkersAndRoute, {
    type INewPoint,
} from "../../components/map/Map";
import { Outlet, useOutlet } from "react-router";
import styles from "./MapFeature.module.css";
import { useEffect, useState } from "react";
import type { ILocationTypes } from "./CreatePointFeature";
import type { ILocation } from "../../components/form_create_point/FormCreatePoint";
import { getAllAidPoints } from "../../service/map.service";

export type IPoint = {
    id: number;
    name: string;
    description: string;
    location: ILocation;
    address: string | null;
    locationType: ILocationTypes;
};

export type IQuery = {
    name: string;
    locationTypeId: number;
    range: number;
    search: boolean;
};

const MapFeature = () => {
    const [selectingPoint, setSelectingPoint] = useState(false);
    const [newPoint, setNewPoint] = useState<INewPoint>({
        latitude: 0,
        longitude: 0,
    });
    const [aidPoints, setAidPoints] = useState<IPoint[]>([]);
    const [coordinate, setCoordinate] = useState<INewPoint | null>(null);
    const [queryParam, setQueryParam] = useState<IQuery>({
        name: "",
        locationTypeId: 0,
        range: 10000,
        search: true,
    });

    const outlet = useOutlet();

    useEffect(() => {
    }, [queryParam]);
     /** Get points */
    useEffect(() => {
        if (coordinate) {
            getAidPoints();
        }
    }, [coordinate, queryParam.search]);

    /** Get current location */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log(position.coords);
            },
            (error) => {
                console.log("Ошибка получения геолокации:", error);
            }
        );
    }, []);

    const getAidPoints = async () => {
        try {
            const params: any = {
                latitude: coordinate?.latitude,
                longitude: coordinate?.longitude,
                range: queryParam.range,
            };

            if (queryParam.locationTypeId !== 0) {
                params["location-type-id"] = queryParam.locationTypeId;
            }

            if (queryParam.name) {
                params["search-query"] = queryParam.name;
            }

            const response = await getAllAidPoints(params);
            setAidPoints(response.data);
        }catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={outlet ? styles.container_slice : styles.container}>
                <MapWithMarkersAndRoute
                    selectingPoint={selectingPoint}
                    setSelectingPoint={setSelectingPoint}
                    newPoint={newPoint}
                    setNewPoint={setNewPoint}
                    aidPoints={aidPoints}
                />
            </div>

            {outlet && (
                <div className={styles.container_outlet}>
                    <Outlet
                        context={{
                            setSelectingPoint,
                            selectingPoint,
                            newPoint,
                            getAidPoints,
                            queryParam,
                            setQueryParam,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default MapFeature;
