import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAidPoint } from "../../service/map.service";
import { getPhotoById } from "../../service/photo.service";
import styles from './DetailsPointFeature.module.css'
import type { IPoint } from "./MapFeature";


const DetailPointFeature = () => {
    const { pointId } = useParams();
    const [point, setPoint] = useState<IPoint | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        getPointInfo();
    }, [pointId]);

    const getPointInfo = async () => {
        try {
            const response = await getAidPoint(pointId);
            setPoint(response.data);

            if (response.data.photoIds?.length) {
                await loadPhotos(response.data.photoIds);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadPhotos = async (photoIds: number[]) => {
        try {
            const loadedPhotos = await Promise.all(
                photoIds.map(async (id) => {
                    const response = await getPhotoById(id);
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    );
                    return `data:image/png;base64,${base64}`;
                })
            );
            setPhotos(loadedPhotos);
        } catch (error) {
            console.log(error);
        }
    };

    if (!point) return <p>Завантаження...</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{point.name}</h1>
            <p className={styles.address}><strong>Адреса:</strong> {point.address}</p>
            <p className={styles.description}>{point.description}</p>

            <div className={styles.info}>
                <div>
                    <h3>Тип точки</h3>
                    <p><strong>{point.locationType.name}</strong></p>
                    <p>{point.locationType.description}</p>
                </div>
                <div>
                    <h3>Координати</h3>
                    <p>Широта: {point.location.latitude}</p>
                    <p>Довгота: {point.location.longitude}</p>
                </div>
            </div>

            {point.services && point.services.length > 0 && (
                <div className={styles.services}>
                    <h3>Послуги</h3>
                    <ul>
                        {point.services.map(service => (
                            <li key={service.id}>
                                <strong>{service.name}:</strong> {service.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {photos.length > 0 && (
                <div className={styles.photos}>
                    {photos.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Фото точки ${index + 1}`}
                            className={styles.photo}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DetailPointFeature;