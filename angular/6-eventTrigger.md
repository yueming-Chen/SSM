## 事件觸發

大家應該對於`addListener`不陌生，在windows下註冊一個監聽，並且監聽點擊事件，這個甚至是每個網頁的必要，我們只需要簡單的程式碼就可以做到，jquery將街口的易用性帶來一個高點，angular則是轉個彎，跟他用不一樣的方式來表現。

### 那些鍵盤與滑鼠的事件

我們只需要乾淨的`(click)`這個接口，後面配上~~可口的~~函式就可以達到跟jquery on一樣的效果，拆開看裡頭的函式，會出現`@output`這個關鍵字，以後會再提到！

```ts
public onClick($event){
    console.log($event);
}

public onFocus($event){
    console.log($event);
}

public onKeyUp($event){
    console.log($event);
}
```

```html
<div (click)="onClick($event)" (mousedown)="" (mouseenter)="" (mouseleave)="" >
    click me!
</div>

<input (focus)="onFocus($event)" (change)="onChange($event)" (keyUp)="onKeyUp($event)" />
```