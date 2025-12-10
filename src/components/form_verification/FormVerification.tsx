import {useEffect, useState } from 'react'
import styles from './FormVerification.module.css'
import { Timer } from '../timer/Timer'
import Button from '../../UI/button'

type IProps = {
    setFormType: React.Dispatch<React.SetStateAction<"login" | "registration" | "verification">>,
    isLoading: boolean,
    verificationUser: (code:string) => Promise<void>
}

const FormVerification = ({setFormType,isLoading,verificationUser}:IProps) => {

    const [receivedCode, setReceivedCode] = useState(() => localStorage.getItem('code_verification') ?? 'Please resend code');
    const [code, setCode] = useState('');
    const [counterKey, setCounterKey] = useState(0);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {

        return () => {
            //localStorage.removeItem('code_verification')
            //localStorage.removeItem('destination')
        }
    },[])

    const sendCode = () => {
        verificationUser(code)
        setBlocked(true);
        setCounterKey(prev => prev + 1); // перезапуск таймера
    };

    return (
        <div className={styles.container}>
            <p className={styles.title}>
                Verification
            </p>
            <div className={styles.container_form_login}>
                <p>{receivedCode}</p>
                <label className={styles.label} htmlFor="username">
                    Verification Code
                </label>

                <input
                    className={styles.input}
                    id="username"
                    type="text"
                    placeholder="Text"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                />
            </div>

            <div className={styles.container_button}>
                <p className={styles.link} onClick={() => setFormType('registration')}>Don't have account?</p>
                <Timer
                    key={counterKey}
                    start={blocked}
                    seconds={30}
                    onFinish={() => setBlocked(false)}
                />
                <Button  onClick={sendCode} disabled={blocked}>
                    Resend code
                </Button>

                <Button  onClick={sendCode} disabled={blocked}>
                    Verification
                </Button>
            </div>
        </div>
    )
}

export default FormVerification