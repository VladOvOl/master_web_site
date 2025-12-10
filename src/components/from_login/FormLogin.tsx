import React, { useState } from 'react'
import styles from './FormLogin.module.css'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import type { ILoginBody } from '../../service/auth.service'
import Button from '../../UI/button'

type IProps = {
    setFormType: React.Dispatch<React.SetStateAction<"login" | "registration" | "verification">>,
    isLoading: boolean,
    loginUser: (body: ILoginBody) => Promise<void>
}

const initialLoginForm = {
  username: "",
  password: ""
};

const FormLogin = ({setFormType,isLoading,loginUser}:IProps) => {

    const [loginForm,setLoginForm] = useState(initialLoginForm)
    const [isShowPassword,setIsShowPassword] = useState(false)

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Login
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
                    onChange={(obj) => setLoginForm({...loginForm,username: obj.target.value })}
                    value={loginForm.username}
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
                    onChange={(obj) => setLoginForm({...loginForm,password: obj.target.value})}
                    value={loginForm.password}
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
                <p 
                    className={styles.link}
                    onClick={() => setFormType('registration')}
                >
                    Don't have account?
                </p>

                <Button  
                    variant='default'
                    onClick={() => loginUser(loginForm)}
                    disabled={isLoading}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default FormLogin