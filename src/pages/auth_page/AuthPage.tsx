import FeatureAuth from "../../feature/auth/Auth";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    return (
        <div className={styles.containerWrapper}>
            <div className={styles.container}>
                <FeatureAuth />
            </div>
        </div>
    );
};

export default AuthPage;
