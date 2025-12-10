import MapFeature from "../../feature/map/MapFeature";
import styles from "./MapPage.module.css";

function MapPage() {

    return (
        <div className={styles.container}>
            <MapFeature/>
        </div>
    );
}

export default MapPage;
