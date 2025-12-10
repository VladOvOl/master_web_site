import { useState } from 'react';
import styles from './Point.module.css'
import type { IPoint } from '../../feature/map/MapFeature';

type IProps = {
    point:IPoint
}

function Point({point}:IProps) {

    const [btn, setBtn] = useState(false)

    return (
        <div className={styles.containerPoint}>
            <p>{point.name}</p>
            <p onClick={() => setBtn(!btn)} className={styles.btn}>
                Open
            </p>
            {btn && (
                <>
                    <p>{point.description}</p>
                    <p>{point.location.latitude}</p>
                    <p>{point.location.longitude}</p>
                    <p>{point.locationType.name}</p>
                    <p>{point.locationType.description}</p>
                </>
            )}
        </div>
    );
}

export default Point;
