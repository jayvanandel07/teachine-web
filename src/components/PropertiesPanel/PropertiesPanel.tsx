import { FC, MutableRefObject, useEffect, useState } from "react";
import styles from "./PropertiesPanel.module.scss";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";
import { debounce, cloneDeep } from "lodash";
import { TeachineObject } from "../Slide/CanvasHandler";

interface PropertiesPanelProps {
    canvasRef: MutableRefObject<CanvasSlideInstance>;
}

const PropertiesPanel: FC<PropertiesPanelProps> = ({ canvasRef }) => {
    const [activeCanvasObject, setActiveCanvasObject] =
        useState<fabric.Object | null>();
    const [, setActivePanelObject] = useState<object | null>();
    const [toExpose, setToExpose] = useState("");

    useEffect(() => {
        const canvas = canvasRef.current.canvas;

        canvas?.on("selection:created", (e) => {
            const activeObject = e.selected?.[0];
            setActiveCanvasObject(activeObject);
            setActivePanelObject(cloneDeep(activeObject));
            setToExpose((activeObject as TeachineObject)?.customData ?? "");
        });

        canvas?.on("selection:updated", (e) => {
            setActivePanelObject(cloneDeep(e.selected?.[0]));
            setToExpose((e.selected?.[0] as TeachineObject).customData ?? "");
        });

        canvas?.on("selection:cleared", () => {
            setActiveCanvasObject(null);
            setActivePanelObject(null);
            setToExpose("");
        });

        canvas?.on(
            "object:moving",
            debounce((e) => {
                setActivePanelObject(cloneDeep(e.target));
            }, 100)
        );
    }, [canvasRef.current.canvas, canvasRef]);

    // if (!activeCanvasObject) return <div>No Active Object</div>;

    return (
        <div className={`${styles.panel} ${styles.invert}`}>
            <div className={`${styles.panelNavigation}`}>
                <p className={`${styles.active}`}>design</p>
                <p className={``}>prototype</p>
            </div>
            <section>
                <h1>General</h1>
                <div>
                    <p>x</p>
                    <input
                        type="number"
                        disabled={!activeCanvasObject}
                        value={activeCanvasObject?.left ?? ""}
                        onChange={(e) => {
                            setActivePanelObject(cloneDeep(e.target));
                            activeCanvasObject
                                ?.set("left", +e.target.value)
                                .setCoords();
                            canvasRef.current.canvas?.requestRenderAll();
                        }}
                    />
                </div>
                <div>
                    <p>y</p>
                    <input
                        type="number"
                        disabled={!activeCanvasObject}
                        value={activeCanvasObject?.top ?? ""}
                        onChange={(e) => {
                            setActivePanelObject(cloneDeep(e.target));
                            activeCanvasObject
                                ?.set("top", +e.target.value)
                                .setCoords();
                            canvasRef.current.canvas?.requestRenderAll();
                        }}
                    />
                </div>
                <div>
                    <p>width</p>
                    <input
                        type="number"
                        disabled={!activeCanvasObject}
                        value={activeCanvasObject?.scaleX ?? ""}
                        onChange={(e) => {
                            setActivePanelObject(cloneDeep(e.target));
                            activeCanvasObject
                                ?.set("scaleX", +e.target.value)
                                .setCoords();
                            canvasRef.current.canvas?.requestRenderAll();
                        }}
                    />
                </div>
                <div>
                    <p>Height</p>
                    <input
                        type="number"
                        disabled={!activeCanvasObject}
                        value={activeCanvasObject?.scaleY ?? ""}
                        onChange={(e) => {
                            setActivePanelObject(cloneDeep(e.target));
                            activeCanvasObject
                                ?.set("scaleY", +e.target.value)
                                .setCoords();
                            canvasRef.current.canvas?.requestRenderAll();
                        }}
                    />
                </div>
                <p>Sensor Value</p>
                <input
                    value={toExpose || ""}
                    disabled={!activeCanvasObject}
                    placeholder={"sense"}
                    onChange={(e) => {
                        setToExpose(e.target.value);
                        (
                            activeCanvasObject as fabric.Object & {
                                customData: string;
                            }
                        )?.set("customData", e.target.value);
                        canvasRef.current.canvas?.requestRenderAll();
                        // setActivePanelObject(cloneDeep(e.target));
                    }}
                ></input>
            </section>
            <section>
                {activeCanvasObject?.type === "text" && (
                    <div>
                        <h1>Object Specific</h1>
                        <input
                            type="text"
                            value={(activeCanvasObject as fabric.Text).text}
                            onChange={(e) => {
                                setActivePanelObject(cloneDeep(e.target));
                                (activeCanvasObject as fabric.Text)
                                    .set("text", e.target.value)
                                    .setCoords();
                                canvasRef.current.canvas?.requestRenderAll();
                            }}
                        />
                    </div>
                )}
            </section>
        </div>
    );
};

export default PropertiesPanel;
