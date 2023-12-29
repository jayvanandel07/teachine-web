import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./Slide.module.scss";
import { fabric } from "fabric";
import { CanvasHandler } from "./CanvasHandler";

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

    useEffect(() => {
      canvasRef.current.canvas = new fabric.Canvas("tne-canvas-id", {
        width: 850,

        height: 540,
      });

      canvasRef.current.handler = new CanvasHandler({
        canvas: canvasRef.current.canvas as fabric.Canvas,
        onAdd: (obj) => {
          console.log(obj);
        },
        onClick: () => {},
      });
    }, []);

    useImperativeHandle(ref, () => ({
      canvas: canvasRef.current.canvas,
      handler: canvasRef.current.handler,
    }));

    return (
      <div className={styles["slide-container"]}>
        {/* <canvas id="tne-canvas-id" className={styles.canvas} /> */}
        <canvas>This contains the canvas</canvas>
      </div>
    );
  }
);

export default CanvasSlide;
