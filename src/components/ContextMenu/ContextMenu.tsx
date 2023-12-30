import React, { FC } from 'react'
import styles from "./ContextMenu.module.css";
import { useContextMenu } from '../../contexts/ContextMenuContext';




const ContextMenu: FC = () =>
{   
    const { isVisible, position, hideContextMenu } = useContextMenu();
    
    if (!isVisible) return null;

    const { top, left } = position;

    return (
        <div className={`${styles.customMenu}`} style={{display: `${isVisible ? "block" : "none"}`,top:top,left:left}} >
            <ul>
                <li onClick={() => hideContextMenu()}>Hide Context Menu</li>
            </ul>
        </div>
    );
}

export default ContextMenu