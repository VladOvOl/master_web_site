import { useEffect, useState } from "react";
import type { IPoint } from "../../feature/map/MapFeature";
import styles from "./ChatPage.module.css";
import { getAllAidPoints } from "../../service/map.service";
import Point from "../../UI/point/Point";
import type { INewPoint } from "../../components/map/Map";

function ChatPage() {
    const [aidPoints, setAidPoints] = useState<IPoint[]>([]);
     const [coordinate, setCoordinate] = useState<INewPoint| null>(null);

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
            <p className={styles.title}>Chat Page</p>
            <div className={styles.containerList}>
                
                    {aidPoints && <Point items = {aidPoints}/>}
                
            </div>
        </div>
    );
}

export default ChatPage;
