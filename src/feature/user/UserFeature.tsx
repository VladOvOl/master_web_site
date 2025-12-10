import FormUserSettings from "../../components/form_user_settings/FormUserSettings";
import styles from "./UserFeature.module.css";

const UserFeature = () => {

    const changeUserInfo = (param:string) => {
        switch (param) {
            case "username":
                param = "username";
                break;
            case "email":
                param = "email";
                break;
            case "phoneNumber":
                param = "phoneNumber";
                break;
            case "password":
                param = "phoneNumber";
                break;
            default:
                console.log("Invalid day")
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>UserFeature</p>
            <div className="containerForm">
                <FormUserSettings changeUserInfo={changeUserInfo} />
            </div>
        </div>
    );
};

export default UserFeature;
