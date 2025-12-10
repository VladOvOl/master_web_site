import { useEffect, useState } from "react";
import { useUserStore, type IUser } from "../../store/user.store";
import styles from "./FormUserSettings.module.css";
import close from "../../assets/close.png";
import Button from "../../UI/button";

type IForm = IUser & {
    password: string;
    oldPassword: string;
};

type IProps = {
    changeUserInfo: (param: any) => void;
};

const FormUserSettings = ({ changeUserInfo }: IProps) => {
    const { user } = useUserStore();
    const [form, setForm] = useState<IForm>({
        ...user,
        password: "12345678",
        oldPassword: "12345678",
    });
    const [param, setParem] = useState("");
    const [paramData, setParemData] = useState("");
    const [on, setOn] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                ...user,
                password: "12345678",
                oldPassword: "12345678",
            });
        }
    }, [user]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const change = (e) => {
        setParem(e.target.name);
        setOn((prev) => !prev);
        if (on) {
            clear();
        }
    };

    const clear = () => {
        setForm({
            ...user,
            password: "12345678",
            oldPassword: "12345678",
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="username">
                    Username
                </label>

                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="username"
                        name="username"
                        type="text"
                        disabled={param === "username" && on ? false : true}
                        onChange={(e) => handleInput(e)}
                        value={form.username}
                    />
                    {param === "username" && on && (
                        <img
                            className={styles.img}
                            src={close}
                            width={20}
                            height={20}
                            onClick={() => clear()}
                        />
                    )}

                    <Button
                        className={styles.btn}
                        name="username"
                        onClick={(e) => change(e)}
                    >
                        {param === "username" && on ? "Cancel" : "Change"}
                    </Button>

                    {param === "username" && on && (
                        <Button
                            className={styles.btn}
                            name="username"
                            onClick={() => changeUserInfo(param)}
                        >
                            Send
                        </Button>
                    )}
                </div>
            </div>

            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="firstName">
                    First Name
                </label>
                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="firstName"
                        name="firstName"
                        type="text"
                        disabled
                        onChange={(e) => handleInput(e)}
                        value={form.firstName || ""}
                    />
                </div>
            </div>

            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="lastName">
                    Last Name
                </label>
                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="lastName"
                        name="lastName"
                        type="text"
                        disabled
                        onChange={(e) => handleInput(e)}
                        value={form.lastName || ""}
                    />
                </div>
            </div>

            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="email">
                    Email
                </label>
                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="email"
                        name="email"
                        type="email"
                        disabled={param === "email" && on ? false : true}
                        onChange={(e) => handleInput(e)}
                        value={form.email || ""}
                    />

                    {param === "email" && on && (
                        <img
                            className={styles.img}
                            src={close}
                            width={20}
                            height={20}
                            onClick={() => clear()}
                        />
                    )}

                    <Button
                        className={styles.btn}
                        name="email"
                        onClick={(e) => change(e)}
                    >
                        {param === "email" && on ? "Cancel" : "Change"}
                    </Button>

                    {param === "email" &&
                        on &&
                        user.email !== form.email &&
                        form.email != "" && (
                            <Button
                                className={styles.btn}
                                name="email"
                                onClick={(e) => change(e)}
                            >
                                Send
                            </Button>
                        )}
                </div>
            </div>

            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="phoneNumber">
                    Phone Number
                </label>
                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="phone"
                        disabled
                        onChange={(e) => handleInput(e)}
                        value={form.phoneNumber || ""}
                    />
                    {param === "phoneNumber" && on && (
                        <img
                            className={styles.img}
                            src={close}
                            width={20}
                            height={20}
                            onClick={() => clear()}
                        />
                    )}

                    <Button
                        className={styles.btn}
                        name="phoneNumber"
                        onClick={(e) => change(e)}
                    >
                        {param === "phoneNumber" && on ? "Cancel" : "Change"}
                    </Button>

                    {param === "phoneNumber" &&
                        on &&
                        user.phoneNumber !== form.phoneNumber &&
                        form.phoneNumber != "" && (
                            <Button
                                className={styles.btn}
                                name="phoneNumber"
                                onClick={(e) => change(e)}
                            >
                                Send
                            </Button>
                        )}
                </div>
            </div>

            <div className={styles.container_password}>
                <div className={styles.container_form_input}>
                    <label className={styles.label} htmlFor="password">
                        Old Password
                    </label>

                    <div className={styles.container_input}>
                        <input
                            className={styles.input}
                            id="password"
                            type="password"
                            name="password"
                            disabled={param === "password" && on ? false : true}
                            onChange={(e) => handleInput(e)}
                            value={form.oldPassword}
                        />
                    </div>
                </div>
                <div className={styles.container_form_input}>
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>

                    <div className={styles.container_input}>
                        <input
                            className={styles.input}
                            id="password"
                            type="password"
                            name="password"
                            disabled={param === "password" && on ? false : true}
                            onChange={(e) => handleInput(e)}
                            value={form.password}
                        />
                        {param === "password" && on && (
                            <img
                                className={styles.img}
                                src={close}
                                width={20}
                                height={20}
                                onClick={() => clear()}
                            />
                        )}

                        <Button
                            className={styles.btn}
                            name="password"
                            onClick={(e) => change(e)}
                        >
                            {param === "password" && on ? "Cancel" : "Change"}
                        </Button>

                        {param === "password" && on && (
                            <Button
                                className={styles.btn}
                                name="password"
                                onClick={(e) => change(e)}
                            >
                                Send
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.container_form_input}>
                <label className={styles.label} htmlFor="role">
                    Role
                </label>
                <div className={styles.container_input}>
                    <input
                        className={styles.input}
                        id="role"
                        type="text"
                        disabled
                        value={form.role || ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormUserSettings;
