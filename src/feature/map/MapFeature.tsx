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
    range: number
};

const MapFeature = () => {
    const [selectingPoint, setSelectingPoint] = useState(false);
    const [newPoint, setNewPoint] = useState<INewPoint>({
        latitude: 0,
        longitude: 0,
    });
    const [aidPoints, setAidPoints] = useState<IPoint[]>([]);
    const [coordinate, setCoordinate] = useState<INewPoint| null>(null);
    const [queryParam, setQueryParam] = useState<IQuery>({name: '',locationTypeId: 0,range:10000,})

    const outlet = useOutlet();

    useEffect(() => {
        if(coordinate){
            getAidPoints();
        }
        
    }, [coordinate]);

    /** Получение текущего местоположения пользователя */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinate({latitude: position.coords.latitude,longitude:position.coords.longitude});
                console.log(position.coords)
            },
            (error) => {
                console.log("Ошибка получения геолокации:", error);
            }
        );
    }, []);

    const getAidPoints = async () => {
        const response = await getAllAidPoints(coordinate?.latitude,coordinate?.longitude);
        setAidPoints(response.data);
    };

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
                            setQueryParam
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default MapFeature;
