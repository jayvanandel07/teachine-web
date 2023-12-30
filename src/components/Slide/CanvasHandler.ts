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

    group.on("moving", () => {
      this.canvas?.forEachObject((element) => {
        if (!isEqual(element, group) && areObjectsNear(element, group)) {
          text.set(
            "text",
            (element as fabric.Object & { customData: string }).customData
          );

          setTimeout(() => {
            text.set("text", "");
          }, 700);
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
  const distance = Math.sqrt(
    Math.pow(obj1.left - obj2.left, 2) + Math.pow(obj1.top - obj2.top, 2)
  );

  // You can adjust the threshold value based on your requirement
  const threshold = 50;

  return distance < threshold;
}
