import React, { FC, MutableRefObject } from "react";
import styles from "./ContextMenu.module.scss";
import { useContextMenu } from "../../contexts/ContextMenuContext";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";

interface ContextMenuProps {
  canvasRef: MutableRefObject<CanvasSlideInstance>;
}
const ContextMenu: FC<ContextMenuProps> = ({ canvasRef }) => {
  const { isVisible, position, hideContextMenu } = useContextMenu();

  if (!isVisible) return null;

  const { top, left } = position;

  return (
    <div
      className={`${styles.customMenu}`}
      style={{
        display: `${isVisible ? "block" : "none"}`,
        top: top,
        left: left,
      }}
    >
      <ul>
        <li
          onClick={() => {
            canvasRef.current?.handler?.groupObjects();
          }}
        >
          Group
        </li>
        <li
          onClick={() => {
            canvasRef.current?.handler?.swapActiveObjects();
          }}
        >
          Swap
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
