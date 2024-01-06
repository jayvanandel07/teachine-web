import { MutableRefObject, useEffect, useRef, useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import QuickActions from "./components/QuickActions/QuickActions";
import CanvasSlide, {
  CanvasSlideInstance,
} from "./components/Slide/CanvasSlide";
import SlidesPanel from "./components/SlidesPanel/SlidesPanel";

import "./main.scss";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import { ContextMenuProvider } from "./contexts/ContextMenuContext";
import Button from "./components/common/button/Button";

function App() {
  const canvasRef = useRef<CanvasSlideInstance>();
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  function clickHandler(e: MouseEvent): void {
    e.preventDefault();
  }
  useEffect(() => {
    window.addEventListener("contextmenu", clickHandler);
    return () => {
      window.removeEventListener("contextmenu", clickHandler);
    };
  }, []);

  return (
    <ContextMenuProvider>
      <div className="wrapper">
        {isCanvasLoaded && (
          <>
            <SlidesPanel />
            <QuickActions
              canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
            />
            {/* <button
              style={{
                position: "absolute",
                left: "50%",
                zIndex: 10,
              }}
              onClick={() => {
                canvasRef.current?.handler?.swapActiveObjects();
              }}
            >
              Swap
            </button> */}
            {/* <button
              style={{
                position: "absolute",
                left: "55%",
                zIndex: 10,
              }}
              onClick={() => {
                canvasRef.current?.handler?.groupObjects();
              }}
            >
              Group
            </button> */}
          </>
        )}
        <CanvasSlide
          ref={(canvasInstance) => {
            canvasRef.current = canvasInstance as CanvasSlideInstance;
            setIsCanvasLoaded(true);
          }}
        />
        {isCanvasLoaded && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                canvasRef.current?.handler?.groupObjects();
              }}
            >
              Group
            </Button>
            <Button
              onClick={() => {
                canvasRef.current?.handler?.swapActiveObjects();
              }}
            >
              Swap
            </Button>
          </div>
        )}
        {isCanvasLoaded && (
          <PropertiesPanel
            canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
          />
        )}
        <ContextMenu
          canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
        />
      </div>
    </ContextMenuProvider>
  );
}

export default App;
