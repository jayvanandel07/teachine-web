import { MutableRefObject, useEffect, useRef, useState } from "react";
import PropertiesPanel from "./components/PropertiesPanel/PropertiesPanel";
import QuickActions from "./components/QuickActions/QuickActions";
import CanvasSlide, {
    CanvasSlideInstance,
} from "./components/Slide/CanvasSlide";
import SlidesPanel from "./components/SlidesPanel/SlidesPanel";

import "./main.scss";
import Button from "./components/common/button/Button";
import { useAuth } from "./contexts/AuthContext";
import useAxios from "./hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

interface canvasSerializedData {
    svg: string | null;
    json: string | null;
}

const initialSlides: canvasSerializedData[] = [{ json: null, svg: null }];

function App() {
    const canvasRef = useRef<CanvasSlideInstance>();
    const [title, setTitle] = useState("Enter Title");
    const [editTitle, setEditTitle] = useState(false);
    const [slides] = useState<canvasSerializedData[]>(initialSlides);
    const [currentSlide] = useState<canvasSerializedData>(slides[0]);
    const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

    const { data, loading, error, sendRequest } = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    function clickHandler(e: MouseEvent): void {
        e.preventDefault();
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        window.addEventListener("contextmenu", clickHandler);
        return () => {
            window.removeEventListener("contextmenu", clickHandler);
        };
    }, []);
    const saveHandler = async (canvasJson: any) => {
        await sendRequest(`${API_URL}` + `/slides`, "POST", {
            title: title || "",
            content: JSON.stringify(canvasJson),
        });
    };
    return (
        <>
            <div className="presentationTitle">
                {editTitle ? (
                    <>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                setEditTitle((prev) => !prev);
                            }}
                            style={{ marginInline: "5px", cursor: "pointer" }}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <div
                        onClick={() => {
                            setEditTitle((prev) => !prev);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {title}
                    </div>
                )}
            </div>
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
                        canvasRef.current =
                            canvasInstance as CanvasSlideInstance;
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
                                saveHandler(
                                    canvasRef.current?.canvas?.toJSON()
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
        </>
    );
}

export default App;
