import React, { FC, MutableRefObject, useEffect, useState } from "react";
import { BiRectangle } from "react-icons/bi";
import { BiCircle } from "react-icons/bi";
import styles from "./QuickActions.module.scss";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";

interface QuickActionsToolbarProps {
  canvasRef: MutableRefObject<CanvasSlideInstance>;
}

const QuickActions: FC<QuickActionsToolbarProps> = ({ canvasRef: canvas }) => {
  return (
    <div className={styles["quick-actions-container"]}>
      <ul>
        <li
          onClick={() => {
            canvas.current.handler?.add();
          }}
        >
          <BiRectangle />
        </li>
        <li>
          <BiCircle />
        </li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default QuickActions;
