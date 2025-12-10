import type { IconName } from "lucide-react/dynamic";
import MenuLabel from "../../UI/menu_label/MenuLabel";
import styles from "./MenuList.module.css";


type IItem = {
    title: string;
    image: IconName;
    link: string;
    children?: IItem[];
};

const MenuItems: IItem[] = [
    {
        title: "Map",
        image: "map-pinned",
        link: "/map",
        children: [
            {
                title: "New Point",
                image: "map-pinned",
                link: "/map/createPoint",
            },
        ],
    },
    {
        title: "Chat",
        image: "message-circle-off",
        link: "/chat",
    },
    {
        title: "Settings",
        image: "settings",
        link: "/settings",
    },
];

const MenuList = () => {
    
    return (
        <div className={styles.container}>
            {MenuItems.map((item, index) => (
                <div key={index} className={styles.itemWrapper}>
                    <MenuLabel
                        title={item.title}
                        image={item.image}
                        link={item.link}
                    />

                    {/* Проверяем наличие дочерних пунктов */}
                    {item.children && (
                        <div className={styles.children}>
                            {item.children.map((child, childIndex) => (
                                <MenuLabel
                                    key={childIndex}
                                    title={child.title}
                                    image={child.image}
                                    link={child.link}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MenuList;
