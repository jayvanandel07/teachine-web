import { MutableRefObject, useEffect, useRef, useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import QuickActions from "./components/QuickActions/QuickActions";
import CanvasSlide, {
    CanvasSlideInstance,
} from "./components/Slide/CanvasSlide";
import SlidesPanel from "./components/SlidesPanel/SlidesPanel";

import "./main.scss";
import Button from "./components/common/button/Button";

interface canvasSerializedData {
    svg: string | null;
    json: string | null;
}

const initialSlides: canvasSerializedData[] = [{ json: null, svg: null }];

function App() {
    const canvasRef = useRef<CanvasSlideInstance>();
    const [slides] = useState<canvasSerializedData[]>(initialSlides);
    const [currentSlide] = useState<canvasSerializedData>(slides[0]);
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
        <div className="wrapper">
            {isCanvasLoaded && (
                <>
                    <SlidesPanel />
                    <QuickActions
                        canvasRef={
                            canvasRef as MutableRefObject<CanvasSlideInstance>
                        }
                    />
                </>
            )}
            <CanvasSlide
                canvasDataJson={currentSlide.json}
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
                    <Button
                        onClick={() => {
                            alert(
                                JSON.stringify(
                                    canvasRef.current?.canvas?.toJSON()
                                )
                            );
                        }}
                    >
                        Save
                    </Button>
                    <Button onClick={() => {}}>Record</Button>
                </div>
            )}
            {isCanvasLoaded && (
                <PropertiesPanel
                    canvasRef={
                        canvasRef as MutableRefObject<CanvasSlideInstance>
                    }
                />
            )}
        </div>
    );
}

export default App;
