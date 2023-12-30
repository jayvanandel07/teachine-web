import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./Slide.module.scss";
import { fabric } from "fabric";
import { CanvasHandler } from "./CanvasHandler";
import { useContextMenu } from "../../contexts/ContextMenuContext";

interface SlideProps {
  ref: MutableRefObject<CanvasSlideInstance>;
}

export interface CanvasSlideInstance {
  canvas: fabric.Canvas | null;
  handler?: CanvasHandler;
}

const CanvasSlide = forwardRef<CanvasSlideInstance, Omit<SlideProps, "ref">>(
  function CanvasSlide(props, ref) {
    const canvasRef = useRef<CanvasSlideInstance>({
      canvas: null,
    });

    const {showContextMenuAtMousePosition,hideContextMenu} = useContextMenu();

    useEffect(() => {
      canvasRef.current.canvas = new fabric.Canvas("tne-canvas-id", {
        width: 850,
        height: 540,
      });

      canvasRef.current.handler = new CanvasHandler({
        canvas: canvasRef.current.canvas as fabric.Canvas,
        onAdd: (obj) => {},
        onClick: () => {},
      });
    }, [canvasRef.current.canvas]);

    useImperativeHandle(ref, () => ({
      canvas: canvasRef.current.canvas,
      handler: canvasRef.current.handler,
    }));

    return (
      <div className={styles["slide-container"]} onContextMenu={(e)=>{showContextMenuAtMousePosition(e)}} onClick={hideContextMenu} >
        <canvas id="tne-canvas-id" className={styles.canvas} />
      </div>
    );
  }
);

export default CanvasSlide;
