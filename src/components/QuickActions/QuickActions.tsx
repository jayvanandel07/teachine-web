import React, { FC, MutableRefObject } from "react";
import { BiRectangle } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { BiCircle } from "react-icons/bi";
import { BsFonts } from "react-icons/bs";

import styles from "./QuickActions.module.scss";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";

interface QuickActionsToolbarProps {
    canvasRef: MutableRefObject<CanvasSlideInstance>;
}

const QuickActions: FC<QuickActionsToolbarProps> = ({ canvasRef }) => {
    return (
        <div className={styles["quick-actions-container"]}>
            <ul>
                <li
                    onClick={() => {
                        canvasRef.current.handler?.addRect();
                    }}
                >
                    <BiRectangle />
                </li>
                <li
                    onClick={() => {
                        canvasRef.current.handler?.addCircle();
                    }}
                >
                    <BiCircle />
                </li>
                <li
                    onClick={() => {
                        canvasRef.current.handler?.addSensor();
                    }}
                >
                    <FaArrowRight />
                </li>
                <li
                    onClick={() => {
                        canvasRef.current.handler?.addText();
                    }}
                >
                    <BsFonts />
                </li>
            </ul>
        </div>
    );
};

export default QuickActions;
