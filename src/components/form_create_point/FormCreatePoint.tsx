import { useEffect, useState } from "react";
import styles from "./FormCreatePoint.module.css";
import type { INewPoint } from "../map/Map";
import type { ILocationTypes, IServiceTypes } from "../../feature/map/CreatePointFeature";
import MultiSelect from "../../UI/MultiSelect";
import Button from "../../UI/button";

export type ILocation = {
    latitude: number;
    longitude: number;
};

export type ICreatePointForm = {
    name: string;
    description: string;
    location: ILocation;
    address: number;
    draftPhotoIds: number[];
    locationTypeId: number;
    serviceIds: number[];
};

const initialCreatePointForm = {
    name: "",
    description: "",
    location: {
        latitude: 0,
        longitude: 0,
    },
    address: "",
    draftPhotoIds: [],
    locationTypeId: 0,
    serviceIds: [0],
};

type IProps = {
    setSelectingPoint: React.Dispatch<React.SetStateAction<boolean>>;
    selectingPoint: boolean;
    loading: boolean;
    newPoint: INewPoint;
    sendPhoto: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    typeLocations: ILocationTypes[];
    typeServices: IServiceTypes[],
    draftPhotoIds: number[]
    createNewPoint: (body: any) => Promise<void>
};

const FormCreatePoint = ({
    setSelectingPoint,
    loading,
    sendPhoto,
    selectingPoint,
    newPoint,
    typeLocations,
    typeServices,
    draftPhotoIds,
    createNewPoint
}: IProps) => {
    const [createPointForm, setCreatePointForm] = useState(
        initialCreatePointForm
    );
    const [files, setFiles] = useState([]);

    useEffect(() => {
        setCreatePointForm({...createPointForm, draftPhotoIds: draftPhotoIds})
        console.log(draftPhotoIds)
    }, [draftPhotoIds]);

    useEffect(() => {
        console.log(createPointForm)
    }, [createPointForm]);

    useEffect(() => {
        setCreatePointForm({...createPointForm, 
            location:{
                latitude:newPoint.latitude,
                longitude:newPoint.longitude}
            })
    }, [newPoint]);


    const handleInputLocation = () => {
        setSelectingPoint(true);

        setCreatePointForm((prev) => {
            const updatedForm = {
                ...prev,
                location: {
                    latitude: newPoint.latitude,
                    longitude: newPoint.longitude,
                },
            };

            return updatedForm;
        });
    };

    const handleInputPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            await sendPhoto(e);

            const updatedFiles = [...files, file];
            setFiles(updatedFiles);
        } catch (error) {
            setFiles((prev) => prev.slice(0, -1));
            console.log("Ошибка при добавлении фото:", error);
        }
    };

    const createPoint = () => {
        try {
            createNewPoint(createPointForm)
            setCreatePointForm(initialCreatePointForm)
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Create New Point</div>

            <div className={styles.containerForm}>
                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="username">
                        Name
                    </label>

                    <input
                        className={styles.input}
                        id="username"
                        type="text"
                        placeholder="Text"
                        onChange={(obj) =>
                            setCreatePointForm({
                                ...createPointForm,
                                name: obj.target.value,
                            })
                        }
                        value={createPointForm.name}
                    />
                </div>

                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="location_type">
                        Location Type
                    </label>
                    <select
                        className={styles.input}
                        id="type"
                        onChange={(obj) =>
                            setCreatePointForm({
                                ...createPointForm,
                                locationTypeId: Number(obj.target.value),
                            })
                        }
                        value={createPointForm.locationTypeId}
                    >
                        <option value={0}>Select Location </option>
                        {typeLocations.map((obj) => (
                            
                            <option value={obj.id}>{obj.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.container_form_location_type}>

                    <label className={styles.label} htmlFor="location_type">
                        Service Type
                    </label>

                    <MultiSelect
                        services={typeServices}
                        value={createPointForm.serviceIds}
                        onChange={(selected) =>
                            setCreatePointForm({
                                ...createPointForm,
                                serviceIds: selected,
                            })
                        }
                    />
                </div>

                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="username">
                        Address
                    </label>

                    <input
                        className={styles.input}
                        id="address"
                        type="text"
                        placeholder="Address"
                        onChange={(obj) =>
                            setCreatePointForm({
                                ...createPointForm,
                                address: obj.target.value,
                            })
                        }
                        value={createPointForm.address}
                    />
                </div>

                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="location">
                        Location
                    </label>

                    <Button
                        id="location"
                        className={styles.input}
                        onClick={() => handleInputLocation()}
                    >
                        {createPointForm.location.latitude
                            ? "Location selected"
                            : "Select location"}
                    </Button>
                </div>

                <div className={styles.container_form_photo}>
                    <label className={styles.label} htmlFor="username">
                        Photos
                    </label>

                    <input
                        className={styles.input}
                        id="username"
                        type="file"
                        placeholder="Image"
                        onChange={(e) => handleInputPhoto(e)}
                    />
                    <ul>
                        {files.map((file, index) => (
                            <li style={{ marginBottom: "10px" }} key={index}>
                                {file.name}
                            </li>
                        ))}
                    </ul>
                    {loading && <p>Загружаем фото...</p>}
                </div>

                <div className={styles.container_textarea}>
                    <label className={styles.label} htmlFor="username">
                        Description
                    </label>

                    <textarea
                        className={styles.text_area}
                        id="description"
                        placeholder="Text"
                        onChange={(obj) =>
                            setCreatePointForm({
                                ...createPointForm,
                                description: obj.target.value,
                            })
                        }
                        value={createPointForm.description}
                    />
                </div>

                <div className={styles.container_form_login}>
                    <Button onClick={() => createPoint() }>Create New Point</Button>
                </div>
            </div>
        </div>
    );
};

export default FormCreatePoint;
