import React, {
  FC,
  MutableRefObject,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import styles from "./PropertiesPanel.module.scss";
import { CanvasSlideInstance } from "../Slide/CanvasSlide";
import { debounce, cloneDeep, toPlainObject } from "lodash";

interface PropertiesPanelProps {
  canvasRef: MutableRefObject<CanvasSlideInstance>;
}

const PropertiesPanel: FC<PropertiesPanelProps> = ({ canvasRef }) => {
  const [activeCanvasObject, setActiveCanvasObject] = useState<fabric.Object>();
  const [activePanelObject, setActivePanelObject] = useState<object>();

  useEffect(() => {
    const canvas = canvasRef.current.canvas;

    canvas?.on("selection:created", (e) => {
      setActiveCanvasObject(e.selected?.[0]);
      setActivePanelObject(cloneDeep(e.selected?.[0]));
    });

    canvas?.on("selection:updated", (e) => {
      setActivePanelObject(cloneDeep(e.selected?.[0]));
    });

    canvas?.on(
      "object:movinga",
      debounce((e) => {
        setActivePanelObject(cloneDeep(e.target));
      }, 100)
    );
  }, [canvasRef.current.canvas, canvasRef]);

  if (!activeCanvasObject) return <div>No Active Object</div>;

  return (
    <div className={styles.panel}>
      <section>
        <h1>General</h1>
        <p> {JSON.stringify(activeCanvasObject)}</p>

        <input
          type="number"
          value={activeCanvasObject.left}
          // value={activeObject.left}
          onChange={(e) => {
            setActivePanelObject(cloneDeep(e.target));

            activeCanvasObject.set("left", +e.target.value).setCoords();
            canvasRef.current.canvas?.requestRenderAll();
          }}
        />
      </section>
    </div>
  );
};

export default PropertiesPanel;
