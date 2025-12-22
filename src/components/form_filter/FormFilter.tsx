import { useEffect } from "react";
import styles from "./FormFilter.module.css";
import type { ILocationTypes } from "../../feature/map/CreatePointFeature";
import Button from "../../UI/button";
import type { IQuery } from "../../feature/map/MapFeature";


type IProps = {
    loading: boolean;
    typeLocations: ILocationTypes[];
    queryParam: IQuery,
    setQueryParam: React.Dispatch<React.SetStateAction<IQuery>>
};

const FormFilter = ({
    loading,
    typeLocations,
    setQueryParam,
    queryParam
}: IProps) => {
  

    useEffect(() => {
        console.log(queryParam)
    }, [queryParam]);


    return (
        <div className={styles.container}>
            <div className={styles.title}>Filters </div>

            <div className={styles.containerForm}>
                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="username">
                        Search query
                    </label>

                    <input
                        className={styles.input}
                        id="search"
                        type="text"
                        placeholder="Text"
                        onChange={(obj) =>
                            setQueryParam({
                                ...queryParam,
                                name: obj.target.value,
                            })
                        }
                        value={queryParam.name}
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
                            setQueryParam({
                                ...queryParam,
                                locationTypeId: Number(obj.target.value),
                            })
                        }
                        value={queryParam.locationTypeId}
                    >
                        <option value={0}>Select Location </option>
                        {typeLocations.map((obj) => (
                            
                            <option value={obj.id}>{obj.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.container_form_login}>
                    <label className={styles.label} htmlFor="username">
                        {`Range : ${queryParam.range}m`}
                    </label>

                    <input
                        className={styles.input}
                        id="search"
                        type="range"
                        min={100}
                        max={100000}
                        onChange={(e) => 
                            setQueryParam({
                                ...queryParam,
                                range: Number(e.target.value),
                            })}
                        value={queryParam.range}
                    />
                </div>

                <div className={styles.container_form_login}>
                    <Button onClick={() =>
                        setQueryParam((prev) => ({
                            ...prev,
                            search: !prev.search,
                        }))
                    }>
                        Search
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormFilter;
