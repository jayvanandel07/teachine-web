import { MutableRefObject, useEffect, useRef, useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import QuickActions from "./components/QuickActions/QuickActions";
import CanvasSlide, {
  CanvasSlideInstance,
} from "./components/Slide/CanvasSlide";
import SlidesPanel from "./components/SlidesPanel/SlidesPanel";

import "./main.scss";
// test commit
function App() {
  const canvasRef = useRef<CanvasSlideInstance>();
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  return (
    <div className="wrapper">
      <SlidesPanel />
      {isCanvasLoaded && (
        <QuickActions
          canvasRef={canvasRef as MutableRefObject<CanvasSlideInstance>}
        />
      )}
      <CanvasSlide
        ref={(canvasInstance) => {
          canvasRef.current = canvasInstance as CanvasSlideInstance;
          setIsCanvasLoaded(true);
        }}
      />
      <PropertiesPanel />
    </div>
  );
}

export default App;
