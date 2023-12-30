import { MutableRefObject, useRef, useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import QuickActions from "./components/QuickActions/QuickActions";
import CanvasSlide, {
  CanvasSlideInstance,
} from "./components/Slide/CanvasSlide";
import SlidesPanel from "./components/SlidesPanel/SlidesPanel";

import "./main.scss";

function App() {
  const canvasRef = useRef<CanvasSlideInstance>();
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  return (
    <div className="wrapper">
      {isCanvasLoaded && (
        <>
          <SlidesPanel />
          <QuickActions
            canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
          />
          <button
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
          </button>
          
        </>
      )}
      <CanvasSlide
        ref={(canvasInstance) => {
          canvasRef.current = canvasInstance as CanvasSlideInstance;
          setIsCanvasLoaded(true);
        }}
      />
      {isCanvasLoaded &&
      <PropertiesPanel
      canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
      />
    }
    </div>
  );
}

export default App;
