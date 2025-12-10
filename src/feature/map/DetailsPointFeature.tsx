import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAidPoint } from "../../service/map.service";
import { getPhotoById } from "../../service/photo.service";
import styles from './DetailsPointFeature.module.css'
import type { IPoint } from "./MapFeature";


const DetailPointFeature = () => {
    const { pointId } = useParams();
    const [photos, setPhotos] = useState<string[]>([]);
    const [point, setPoint] = useState<IPoint>();

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

    const loadPhotos = async (photoIds: string[]) => {
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

    return (
        <div className={styles.container}>
            <p>Point № {pointId}</p>
            <p>{point?.name}</p>
            <p>{point?.description}</p>

            <p>
                {point?.location.latitude} : {point?.location.longitude}
            </p>

            <p>{point?.locationType.name}</p>
            <p>{point?.locationType.description}</p>

            {photos.length > 0 && (
                <div className={styles.photos}>
                    {photos.map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            width={"100%"}
                            height={200}
                            alt={`point photo ${index}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DetailPointFeature;