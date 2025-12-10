import { useAuth } from '../../providers/auth/AuthProvider';
import { useUserStore } from '../../store/user.store';
import Avatar from '../Avatar';
import Button from '../button';
import styles from './UserLabel.module.css'

const UserLabel = () => {

    const {logout} = useAuth()
    const {user} = useUserStore()

    return (
        <div className={styles.container}>
            <div className={styles.container_avatar}>
                <Avatar firstName={user.firstName} lastName={user.lastName}/>
                <p>{user.username}</p>
            </div>
            
            <Button variant='destructive' onClick={() => logout()}>
                Log out
            </Button>
        </div>
    );
};

export default UserLabel;
