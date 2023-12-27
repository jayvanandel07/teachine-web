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
  }

  addRect() {
    const createdObject = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });
    this.canvas?.add(createdObject);
    this.canvas?.setActiveObject(createdObject);

    if (this.onAdd) {
      this.onAdd(createdObject);
    }
  }

  addSensor() {
    const createdObject = new fabric.Rect({
      width: 30,
      height: 30,
      left: 0,
      top: 0,
      fill: "blue",

      originX: "center", // Center the object horizontally
      originY: "center", // Center the object vertically
    });

    const text = new fabric.Text("", {
      left: 10, // Adjust the position based on your needs
      top: 10,
      originX: "center", // Center the text horizontally
      originY: "center", // Center the text vertically
    });

    const group = new fabric.Group([createdObject, text], {
      left: 100,
      top: 100,
    });

    // this.canvas?.on("object:moving", (event) => {});

    group.on("moving", (e) => {
      this.canvas?.forEachObject((element) => {
        if (!isEqual(element, group) && areObjectsNear(element, group)) {
          text.set("text", element?.customData);
        }
      });
    });

    this.canvas?.add(group);
  }

  addText() {
    const createdObject: fabric.Text & { customData: string } = new fabric.Text(
      "Test",
      {
        left: 100,
        top: 100,
        // fill: "blue",
        // width: 20,
        // height: 20,
      }
    ) as fabric.Text & { customData: string };

    createdObject.set({
      customData: "bro",
    });

    this.canvas?.add(createdObject as fabric.Rect);
  }
}

function areObjectsNear(obj1, obj2) {
  const distance = Math.sqrt(
    Math.pow(obj1.left - obj2.left, 2) + Math.pow(obj1.top - obj2.top, 2)
  );

  // You can adjust the threshold value based on your requirement
  const threshold = 50;
  console.log(distance, threshold);

  return distance < threshold;
}
