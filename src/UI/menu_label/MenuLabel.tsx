import { Link, useLocation } from "react-router";
import styles from "./MenuLabel.module.css";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type IProps = {
    title: string;
    image: IconName;
    link: string;
};

const MenuLabel = ({ title, image, link }: IProps) => {
    const {pathname} = useLocation();
    const isLinkActive = pathname.startsWith(link);
    return (
        <Link
            className={ isLinkActive 
                ? `${styles.container} ${styles.active}`
                : styles.container   
            }
            to={link}
        >
            <div>{title}</div>
            <DynamicIcon name={image} />
        </Link>
    );
};

export default MenuLabel;
