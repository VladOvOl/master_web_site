import { Outlet } from "react-router";
import styles from './Layout.module.css'
import SideBar from "../../components/side_bar/SideBar";

function Layout() {
    return (
        <main className={styles.main_container_wrapper}>
            <div className={styles.main_container}>
                <aside className={styles.aside_container}>
                    <SideBar/>
                </aside>

                <section className={styles.section_container}>
                    <Outlet />
                </section>
            </div> 
        </main>
    );
}

export default Layout;
