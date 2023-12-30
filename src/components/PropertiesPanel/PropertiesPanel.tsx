import { FC, MutableRefObject, useEffect, useState } from "react";
import styles from "./PropertiesPanel.module.scss";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";
import { debounce, cloneDeep } from "lodash";

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
      setToExpose(
        (activeObject as fabric.Object & { customData: string })?.customData ||
          ""
      );
    });

    canvas?.on("selection:updated", (e) => {
      setActivePanelObject(cloneDeep(e.selected?.[0]));
    });

    canvas?.on("selection:cleared", () => {
      setActiveCanvasObject(null);
      setActivePanelObject(null);
      setToExpose("");
    });

    canvas?.on("mouse:dblclick", (e) => {
      console.log(e);
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
      <section>
        <h1>General</h1>
        <p>x</p>
        <input
          type="number"
          disabled={!activeCanvasObject}
          value={activeCanvasObject?.left ?? ""}
          onChange={(e) => {
            setActivePanelObject(cloneDeep(e.target));
            activeCanvasObject?.set("left", +e.target.value).setCoords();
            canvasRef.current.canvas?.requestRenderAll();
          }}
        />
        <p>expose</p>
        <input
          value={toExpose || ""}
          disabled={!activeCanvasObject}
          placeholder={"sense"}
          onChange={(e) => {
            setToExpose(e.target.value);
            (activeCanvasObject as fabric.Object & { customData: string })?.set(
              "customData",
              e.target.value
            );
            debounce(() => {
              canvasRef.current.canvas?.requestRenderAll();
            }, 10);
            setActivePanelObject(cloneDeep(e.target));
          }}
        ></input>
      </section>
      <section>
        <h1>Object Specific</h1>
        {activeCanvasObject?.type === "text" && (
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
        )}
      </section>
    </div>
  );
};

export default PropertiesPanel;
