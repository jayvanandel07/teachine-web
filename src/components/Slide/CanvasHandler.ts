import { fabric } from "fabric";
import { isEqual } from "lodash";

interface CanvasHandlersCallback {
    onAdd?: (obj: fabric.Object) => void;
    onClick?: () => void;
    onSelect?: (target: unknown) => void;
    onRemove?: (target: unknown) => void;
}
interface CanvasHandlersOptions extends CanvasHandlersCallback {
    canvas: fabric.Canvas;
}

export type FabricObject = fabric.Object & { customData: string };

export class CanvasHandler {
    public canvas?: fabric.Canvas;

    public onAdd?: (obj: fabric.Object) => void;
    public onClick?: () => void;

    onSelect?: (target: unknown) => void;
    onRemove?: (target: unknown) => void;

    constructor(options: CanvasHandlersOptions) {
        this.initHandlers(options);
        this.initOptions(options);
    }

    private initHandlers(options: CanvasHandlersOptions) {
        this.onAdd = options.onAdd;
        this.onClick = options.onClick;
        this.onSelect = options.onSelect;
        this.onRemove = options.onRemove;
    }

    private initOptions(options: CanvasHandlersOptions) {
        this.canvas = options.canvas;

        this.canvas?.on("selection:updated", () => {
            if (this.canvas?.getActiveObjects().length === 2) {
                // swapButton.set("visible", true);
            } else {
                // swapButton.set("visible", false);
            }
            this.canvas?.renderAll();
        });

        this.canvas.on("selection:cleared", () => {
            // swapButton.set("visible", false);
        });
    }

    addRect() {
        const createdObject = new fabric.Rect({
            left: 100,
            top: 100,
            fill: "white",
            stroke: "black",
            rx: 2,
            ry: 2,
            width: 20,
            height: 20,
        });
        this.canvas?.add(createdObject);
        this.canvas?.setActiveObject(createdObject);

        if (this.onAdd) {
            this.onAdd(createdObject);
        }
    }

    addCircle() {
        const createdObject = new fabric.Circle({
            left: 100,
            top: 100,
            fill: "white",
            stroke: "black",
            radius: 10,
        });
        this.canvas?.add(createdObject);
        this.canvas?.setActiveObject(createdObject);

        if (this.onAdd) {
            this.onAdd(createdObject);
        }
    }

    addSensor() {
        const arrowPoints = [
            { x: 0, y: 0 },
            { x: 20, y: -40 },
            { x: 40, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 40 },
            { x: 10, y: 40 },
            { x: 10, y: 0 },
        ];

        const sensor = new fabric.Polygon(arrowPoints, {
            width: 10,
            height: 10,
            left: 100,
            top: 100,
            strokeWidth: 5,
            fill: "white",
            stroke: "black",
            originX: "center",
            originY: "center",
            // lockUniScaling: true,
            lockScalingX: true,
            lockScalingY: true,
        });

        const text = new fabric.Text("", {
            left: 100,
            top: 150,
            fontSize: 20,
            originX: "center",
            selectable: false,
            originY: "center",
        });

        this.canvas?.add(text);

        sensor.on("moving", () => {
            text.set({
                left: sensor.left,
                top: sensor.top + 50,
            });

            this.canvas?.forEachObject((element) => {
                if (!(element as FabricObject).customData) return;

                if (isEqual(element, sensor) && isEqual(text, sensor)) return;

                if (!areObjectsNear(element, sensor)) return;

                text.set("text", (element as FabricObject).customData);

                setTimeout(() => {
                    text.set("text", "");
                }, 700);
            });
        });

        this.canvas?.add(sensor);
    }

    addText() {
        const createdObject: fabric.Text & { customData: string } =
            new fabric.Text("Text", {
                left: 100,
                top: 100,
                fontSize: 19,
            }) as fabric.Text & { customData: string };

        // createdObject.set({
        //   customData: "bro",
        // });

        this.canvas?.add(createdObject as fabric.Rect);
    }

    swapActiveObjects() {
        const activeObjects = this.canvas?.getActiveObjects();

        if (!activeObjects) return;

        if (activeObjects?.length !== 2)
            return alert(
                `Select ${
                    activeObjects?.length > 2 ? "only" : "atleast"
                } two objects to swap`
            );

        const [obj1, obj2] = activeObjects;

        obj1.animate("left", obj2.left as number, {
            duration: 1000,
            onChange: this.canvas?.renderAll.bind(this.canvas),
            onComplete: function () {
                // animateBtn.disabled = false;
            },
            easing: fabric.util.ease["easeInBack"],
            // easing: fabric.util.ease[document.getElementById("easing").value],
        });

        obj1.animate("top", obj2.top as number, {
            duration: 1000,
            onChange: this.canvas?.renderAll.bind(this.canvas),
            onComplete: function () {
                // animateBtn.disabled = false;
            },
            easing: fabric.util.ease["easeInBack"],
            // easing: fabric.util.ease[document.getElementById("easing").value],
        });

        obj2.animate("left", obj1.left as number, {
            duration: 1000,
            onChange: this.canvas?.renderAll.bind(this.canvas),
            onComplete: function () {
                // animateBtn.disabled = false;
            },

            easing: fabric.util.ease["easeInBack"],
            // easing: fabric.util.ease[document.getElementById("easing").value],
        });

        obj2.animate("top", obj1.top as number, {
            duration: 1000,
            onChange: this.canvas?.renderAll.bind(this.canvas),
            onComplete: function () {
                // animateBtn.disabled = false;
            },

            easing: fabric.util.ease["easeInBack"],
            // easing: fabric.util.ease[document.getElementById("easing").value],
        });
    }

    groupObjects() {
        const objectsToGroup = this.canvas?.getActiveObjects();

        const group = new fabric.Group(objectsToGroup, {
            originX: "center",
            originY: "center",
        });

        objectsToGroup?.forEach((obj) => this.canvas?.remove(obj));

        this.canvas?.add(group);
        this.canvas?.renderAll();
    }
}

function areObjectsNear(obj1: fabric.Object, obj2: fabric.Object) {
    if (!obj1.left || !obj1.top || !obj2.left || !obj2.top) return false;

    const distance = Math.sqrt(
        Math.pow(obj1.left - obj2.left, 2) + Math.pow(obj1.top - obj2.top, 2)
    );

    // You can adjust the threshold value based on your requirement
    const threshold = 50;

    return distance < threshold;
}
