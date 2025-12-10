import UserLabel from '../../UI/user_label/UserLabel';
import MenuList from '../menu_list/MenuList';
import styles from './SideBar.module.css'


function SideBar() {
    return(
        <div className={styles.container}>   
            <MenuList/>
            <UserLabel/>
        </div>
    )
}



export default SideBar;
