import { useEffect, useState } from "react";
import {EyeIcon,EyeOffIcon} from 'lucide-react'
import styles from './FormRegistration.module.css'
import Button from "../../UI/button";

export type IRegistrationForm = {
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email?: string,
  phoneNumber?: string
};

const initialRegistrationForm = {
  username: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: ""
};

type IProps = {
    createUser: (data:IRegistrationForm) => Promise<void>,
    setFormType: React.Dispatch<React.SetStateAction<"login" | "registration" | "verification">>,
    isLoading: boolean,
}

const FormRegistration = ({createUser, isLoading,setFormType}:IProps) => {

    const [registrationForm,setRegistrationForm] = useState(initialRegistrationForm)
    const [isNumberOrEmail,setIsNumberOrEmail] = useState(true)
    const [isShowPassword,setIsShowPassword] = useState(false)

    const registrationUser = () => {
        if (registrationForm.password !== registrationForm.confirmPassword) {
            alert("Passwords are not equal");
            return;
        }

        const formToSend:IRegistrationForm = { ...registrationForm };

        if (isNumberOrEmail) {
            delete formToSend.email;
        } else {
            delete formToSend.phoneNumber;
        }

        createUser(formToSend);
    }

    useEffect(() => {
        console.log(registrationForm)
    },[registrationForm])

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Registration
            </p>
            <div className={styles.container_form_login}>
                <label className={styles.label} htmlFor="username">
                    Username
                </label>

                <input
                    className={styles.input}
                    id="username"
                    type="text"
                    placeholder="Text"
                    onChange={(obj) =>
                        setRegistrationForm({
                            ...registrationForm,
                            username: obj.target.value,
                        })
                    }
                    value={registrationForm.username}
                />
            </div>

            <div className={styles.container_form_login}>
                <label className={styles.label} htmlFor="first_name">
                    FirstName
                </label>

                <input
                    className={styles.input}
                    id="first_name"
                    type="text"
                    placeholder="Text"
                    onChange={(obj) =>
                        setRegistrationForm({
                            ...registrationForm,
                            firstName: obj.target.value,
                        })
                    }
                    value={registrationForm.firstName}
                />
            </div>

            <div className={styles.container_form_login}>
                <label className={styles.label} htmlFor="last_name">
                    LastName
                </label>

                <input
                    className={styles.input}
                    id="last_name"
                    type="text"
                    placeholder="Text"
                    onChange={(obj) =>
                        setRegistrationForm({
                            ...registrationForm,
                            lastName: obj.target.value,
                        })
                    }
                    value={registrationForm.lastName}
                />
            </div>

            <div className={styles.container_form_login}>
                <label className={styles.label} htmlFor="email">
                    <button
                        onClick={() => setIsNumberOrEmail(!isNumberOrEmail)}
                    >
                        {isNumberOrEmail ? "PhoneNumber" : "Email"}
                    </button>
                </label>

                <input
                    className={styles.input}
                    id="email"
                    type={isNumberOrEmail ? "tel" : "email"}
                    placeholder={
                        isNumberOrEmail ? "+380639437844" : "email@gmail.com"
                    }
                    onChange={(e) => {
                        if (isNumberOrEmail) {
                        setRegistrationForm(prev => ({
                            ...prev,
                            phoneNumber: e.target.value,
                        }));
                        } else {
                        setRegistrationForm(prev => ({
                            ...prev,
                            email: e.target.value,
                        }));
                        }
                    }}
                    value={isNumberOrEmail ? registrationForm.phoneNumber : registrationForm.email}
                />
            </div>

            <div className={styles.container_form_login}>
                <label className={styles.label} htmlFor="password">
                    Password
                </label>

                <input
                    className={styles.input}
                    id="password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(obj) =>
                        setRegistrationForm({
                            ...registrationForm,
                            password: obj.target.value,
                        })
                    }
                    value={registrationForm.password}
                />
            </div>

            <div className={styles.container_form_login_conf}>
                <label className={styles.label} htmlFor="confirm_password">
                    Confirm Password
                </label>

                <input
                    className={styles.input}
                    id="confirm_password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(obj) =>
                        setRegistrationForm({
                            ...registrationForm,
                            confirmPassword: obj.target.value,
                        })
                    }
                    value={registrationForm.confirmPassword}
                />

                <div
                    className={styles.container_icon_password}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                >
                    {isShowPassword ? (
                        <EyeIcon width={20} />
                    ) : (
                        <EyeOffIcon width={20} />
                    )}
                </div>
            </div>

            <div className={styles.container_button}>
                <p className={styles.link} onClick={() => setFormType('login')}>
                    Already have account?
                </p>

                <Button onClick={registrationUser} disabled={isLoading}>
                    Registration
                </Button>
            </div>
        </div>
    );
};

export default FormRegistration;
