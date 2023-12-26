import { fabric } from "fabric";

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

  add() {
    const createdObject = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });

    this.canvas?.add(createdObject);
    this.canvas?.setActiveObject(createdObject);
    console.log("Adding");
    if (this.onAdd) {
      this.onAdd(createdObject);
    }
  }
}
