import {
    MutableRefObject,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import styles from "./CanvasSlide.module.scss";
import { fabric } from "fabric";
import { CanvasHandler } from "./CanvasHandler";
// import { useContextMenu } from "../../contexts/ContextMenuContext";

interface SlideProps {
    ref: MutableRefObject<CanvasSlideInstance>;
    canvasDataJson: string | null;
}

export interface CanvasSlideInstance {
    canvas: fabric.Canvas | null;
    handler?: CanvasHandler;
}

const CanvasSlide = forwardRef<CanvasSlideInstance, Omit<SlideProps, "ref">>(
    function CanvasSlide({ canvasDataJson }, ref) {
        const canvasRef = useRef<CanvasSlideInstance>({
            canvas: null,
        });

        console.log(canvasDataJson);

        // const { showContextMenuAtMousePosition, hideContextMenu } =
        // useContextMenu();

        useEffect(() => {
            canvasRef.current.canvas = new fabric.Canvas("tne-canvas-id", {
                width: 850,
                height: 540,
            });
            // canvasRef.current.canvas.loadFromJSON(canvasDataJson);
            canvasRef.current.handler = new CanvasHandler({
                canvas: canvasRef.current.canvas as fabric.Canvas,
                onAdd: () => {},
                onClick: () => {},
            });
        }, [canvasRef.current.canvas]);

        useImperativeHandle(ref, () => ({
            canvas: canvasRef.current.canvas,
            handler: canvasRef.current.handler,
        }));

        return (
            <div
                className={styles["slide-container"]}
                // onContextMenu={() => {
                //     // showContextMenuAtMousePosition(e);
                // }}
                // onClick={hideContextMenu}
                onClick={() => {}}
            >
                <canvas id="tne-canvas-id" className={styles.canvas} />
            </div>
        );
    }
);

export default CanvasSlide;
