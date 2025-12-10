import { useState } from "react";
import styles from "./Auth.module.css";
import {createRegistration,createVerificationUser,loginUserService, resendVerificationCode,type ILoginBody,} from "../../service/auth.service";
import type { AxiosError } from "axios";
import FormRegistration, {type IRegistrationForm} from "../../components/form_registration/FormRegistration";
import FormLogin from "../../components/from_login/FormLogin";
import FormVerification from "../../components/form_verification/FormVerification";
import { useAuth } from "../../providers/auth/AuthProvider";
import { getUserInfo } from "../../service/user.service";
import { useUserStore } from "../../store/user.store";

const FeatureAuth = () => {
    const [formType, setFormType] = useState<"login" | "registration" | "verification">("login");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const {setUser} = useUserStore()

    const registrationUserForm = async (registrationForm: IRegistrationForm) => {
        try {
            setIsLoading(true);
            const response = await createRegistration(registrationForm);

            if (response.data.status === "OK") {
                if (registrationForm.email) {
                    localStorage.setItem("destination", registrationForm.email);
                }
                if (registrationForm.phoneNumber) {
                    localStorage.setItem(
                        "destination",
                        registrationForm.phoneNumber
                    );
                }

                localStorage.setItem("code_verification", response.data.code);

                setFormType("verification");
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.data?.errors) {
                alert(JSON.stringify(err.response?.data?.errors));
            }
            if (err.response?.status === 409) {
                setFormType("verification");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const verificationUser = async (code: string) => {
        let body;
        let response;

        try {
            body = {
                code: code,
                destination: localStorage.getItem("destination") ?? " ",
            };

            response = await createVerificationUser(body);
            login(response.data.token);
            const res = await getUserInfo()
            setUser(res.data)
            
        } catch (error) {
            console.log(error);
        } finally {
            console.log(response);
        }
    };

    const resendVerification = async () => {
        try {
            setIsLoading(true);
            const response = await resendVerificationCode();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (body: ILoginBody) => {
        try {
            setIsLoading(true);
            const response = await loginUserService(body);
            login(response.data.token);
            const res = await getUserInfo()
            setUser(res.data)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        switch (formType) {
            case "login":
                return (
                    <FormLogin
                        loginUser={loginUser}
                        setFormType={setFormType}
                        isLoading={isLoading}
                    />
                );
            case "registration":
                return (
                    <FormRegistration
                        createUser={registrationUserForm}
                        setFormType={setFormType}
                        isLoading={isLoading}
                    />
                );
            case "verification":
                return (
                    <FormVerification
                        isLoading={isLoading}
                        setFormType={setFormType}
                        verificationUser={verificationUser}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            {renderContent()}
        </div>
    )
};

export default FeatureAuth;
