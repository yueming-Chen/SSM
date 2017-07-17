import { Directive, Output, Input, ElementRef, Renderer, HostListener, AfterViewInit, EventEmitter, Injectable } from "@angular/core";
import { Subscription, Observable } from "rxjs";


export type Direction = "Top" | "Bottom" | "Left" | "LeftTop" | "LeftBottom" | "Right" | "RightTop" | "RightBottom" | null;

@Directive({
  selector: "[ngDraggable]"
})
export class DraggableDirective implements AfterViewInit {
  @Input() draggable: boolean = true;
  @Input() resizable: boolean = true;
  private dragging: boolean = false;
  private resizing: boolean = false;
  private resizingDirection: Direction = null;
  private oriMouseX: number = 0;
  private oriMouseY: number = 0;
  private oriDomX: number = 0;
  private oriDomY: number = 0;
  private oriDomWidth: number = 0;
  private oriDomHeight: number = 0;
  private mustBePosition: string[] = ['absolute', 'fixed', 'relative'];
  private nel: HTMLStyleElement;
  private draggingSubscription: Subscription;
  private draggingEndSubscription: Subscription;
  private scanReizeSubscription: Subscription;
  private resizingSubscription: Subscription;
  private resizingEndSubscription: Subscription;
  private _x: number = 0;
  private _y: number = 0;
  private _width: number = 0;
  private _height: number = 0;

  static focusElement: HTMLStyleElement = null;
  @HostListener("window:mousedown")
  public unfocus() {
    if (DraggableDirective.focusElement) {
      this.renderer.setElementClass(DraggableDirective.focusElement, "focused", false);
      DraggableDirective.focusElement = null;
    }
  }

  @Output()
  public xChange = new EventEmitter<number>();

  public get x(): number {
    return this.nel.offsetLeft;
  }

  @Input()
  public set x(x: number) {
    this._x = x;
    this.renderer.setElementStyle(this.nel, "left", this._x + "px");
    this.xChange.emit(this._x);
  }

  @Output()
  public yChange = new EventEmitter<number>();

  public get y(): number {
    return this.nel.offsetTop;
  }

  @Input()
  public set y(y: number) {
    this._y = y;
    this.renderer.setElementStyle(this.nel, "top", this._y + "px");
    this.yChange.emit(this._y);
  }

  @Output()
  public widthChange = new EventEmitter<number>();

  public get width(): number {
    return this.nel.clientWidth;
  }

  @Input()
  public set width(width: number) {
    this._width = width;
    this.renderer.setElementStyle(this.nel, "width", this._width + "px");
    this.widthChange.emit(this._width);
  }


  @Output()
  public heightChange = new EventEmitter<number>();

  public get height(): number {
    return this.nel.clientHeight;
  }

  @Input()
  public set height(height: number) {
    this._height = height;
    this.renderer.setElementStyle(this.nel, "height", this._height + "px");
    this.heightChange.emit(this._height);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {
    this.nel = el.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.draggable) return;
    this.oriMouseX = event.x;
    this.oriMouseY = event.y;
    this.oriDomX = this.x;
    this.oriDomY = this.y;
    this.oriDomWidth = this.width;
    this.oriDomHeight = this.height;
    this.dragging = true;

    if (this.draggable && !this.resizingDirection) {
      this.draggingSubscription = Observable
        .fromEvent(document, "mousemove")
        .subscribe(this.onDragging.bind(this));

      this.draggingEndSubscription = Observable
        .fromEvent(document, "mouseup")
        .subscribe(this.onDraggingEnd.bind(this));
    }

    /** 所點選的物件並非現在關注的物件，關注該物件 */
    if (DraggableDirective.focusElement !== this.nel) {
      if (DraggableDirective.focusElement) {
        this.renderer.setElementClass(DraggableDirective.focusElement, "focused", false);
      }
      this.renderer.setElementClass(this.nel, "focused", true);
      DraggableDirective.focusElement = this.nel;

      /** 偵測改變大小的事件 */
      if (this.scanReizeSubscription) {
        this.scanReizeSubscription.unsubscribe();
      }
      this.scanReizeSubscription = Observable
        .fromEvent(this.nel, "mousemove")
        .subscribe(this.onScanResize.bind(this));
      this.resizingDirection = null;
    }

    /** 如果有任何改變大小的方向性 */
    if (this.resizingDirection) {
      this.resizing = true;
      this.resizingSubscription = Observable
        .fromEvent(document, "mousemove")
        .subscribe(this.onResizing.bind(this));
      this.resizingEndSubscription = Observable
        .fromEvent(document, "mouseup")
        .subscribe(this.onResizingEnd.bind(this));
    }
    return event.stopPropagation();
  }

  onDragging(event: MouseEvent) {
    if (!event.which) {
      this.onDraggingEnd(event);
    };
    let x = event.x;
    let y = event.y;
    x = this.oriDomX + (x - this.oriMouseX);
    y = this.oriDomY + (y - this.oriMouseY);
    this.x = x - x % 5;
    this.y = y - y % 5;
  }

  onDraggingEnd(event: MouseEvent) {
    this.oriMouseX = 0;
    this.oriMouseY = 0;
    this.dragging = false;
    this.nel.style.pointerEvents = 'all';
    this.draggingEndSubscription.unsubscribe();
    this.draggingSubscription.unsubscribe();
  }

  getDirection(x: number, y: number): Direction {
    let position = this.nel.getBoundingClientRect();
    let has = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };

    if (this.isNumberCloseTo(x, position.left)) {
      has.left = true;
    } else if (this.isNumberCloseTo(x, position.right)) {
      has.right = true;
    }

    if (this.isNumberCloseTo(y, position.top)) {
      has.top = true;
    } else if (this.isNumberCloseTo(y, position.bottom)) {
      has.bottom = true;
    }

    if (has.top) {
      if (has.left) return "LeftTop";
      else if (has.right) return "RightTop";
      else return "Top";
    } else if (has.bottom) {
      if (has.left) return "LeftBottom";
      else if (has.right) return "RightBottom";
      else return "Bottom";
    } else {
      if (has.left) return "Left";
      else if (has.right) return "Right";
      else return null;
    }
  }

  getCursor(direction: Direction): string {
    switch (direction) {
      case "Left":
      case "Right":
        return "ew-resize";

      case "Top":
      case "Bottom":
        return "ns-resize";

      case "LeftTop":
        return "nw-resize";

      case "LeftBottom":
        return "sw-resize";

      case "RightTop":
        return "ne-resize";

      case "RightBottom":
        return "se-resize";

      default:
        return "default";
    }
  }

  onScanResize(event: MouseEvent) {
    if (!this.resizing) {
      this.resizingDirection = this.getDirection(event.x, event.y);
      let cursor = this.getCursor(this.resizingDirection);
      this.renderer.setElementStyle(this.nel, "cursor", cursor);
    }
  }

  onResizing(event: MouseEvent) {
    if (!event.which) { this.onResizingEnd(event); };
    let x = event.x;
    let y = event.y;
    let width = 0;
    let height = 0;
    let Δwidth = x - this.oriMouseX;
    let Δheight = y - this.oriMouseY;
    switch (this.resizingDirection) {
      case "Left":
        x = this.oriDomX + Δwidth;
        width = this.oriDomWidth - Δwidth;
        this.x = x - x % 5;
        this.width = width - width % 5;
        break;

      case "Right":
        width = this.oriDomWidth + Δwidth;
        this.width = width - width % 5;
        break;

      case "Top":
        y = this.oriDomY + Δheight;
        height = this.oriDomHeight - Δheight;
        this.y = y - y % 5;
        this.height = height - height % 5;
        break;

      case "Bottom":
        height = this.oriDomHeight + Δheight;
        this.height = height - height % 5;
        break;

      case "LeftTop":
        x = this.oriDomX + Δwidth;
        width = this.oriDomWidth - Δwidth;
        y = this.oriDomY + Δheight;
        height = this.oriDomHeight - Δheight;
        this.x = x - x % 5;
        this.width = width - width % 5;
        this.y = y - y % 5;
        this.height = height - height % 5;
        break;

      case "LeftBottom":
        x = this.oriDomX + Δwidth;
        width = this.oriDomWidth - Δwidth;
        height = this.oriDomHeight + Δheight;
        this.x = x - x % 5;
        this.width = width - width % 5;
        this.height = height - height % 5;
        break;

      case "RightTop":
        width = this.oriDomWidth + Δwidth;
        y = this.oriDomY + Δheight;
        height = this.oriDomHeight - Δheight;
        this.width = width - width % 5;
        this.y = y - y % 5;
        this.height = height - height % 5;
        break;

      case "RightBottom":
        width = this.oriDomWidth + Δwidth;
        height = this.oriDomHeight + Δheight;
        this.width = width - width % 5;
        this.height = height - height % 5;
        break;

      default:
        return "default";
    }
  }

  onResizingEnd(event: MouseEvent) {
    this.resizingEndSubscription.unsubscribe();
    this.resizingEndSubscription = null;
    this.resizingSubscription.unsubscribe();
    this.resizingSubscription = null;
    this.resizing = false;
  }

  isNumberCloseTo(value1: number, value2: number, precision: number = 3): boolean {
    return Math.abs(value1 - value2) < precision;
  }

  ngAfterViewInit() {

  }
}