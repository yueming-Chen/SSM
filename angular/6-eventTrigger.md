## 事件觸發

大家應該對於`addListener`不陌生，在windows下註冊一個監聽，並且監聽點擊事件，這個甚至是每個網頁的必要，我們只需要簡單的程式碼就可以做到，`jquery`將接口的易用性帶來一個高點，angular則是轉個彎，跟他用不一樣的方式來表現。

當監聽外部的事件不再只是用js來設定，而是最簡單的做一個`(click)`，以及設定一個程式碼去接，這是angular的設計藝術，有別於`vuex`，就需要去設定`v-on:click`，全部都依賴在on之中，當然vuex之中也有語法糖`:click`但已經超出我們教學的範圍。


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

那更近一步詳細的指令操作，比如說`mouseup.enter`等等，對於單一按鈕的設定非常方便，但對於處理大量的事件觸發，也有不同的解法`hostlistener`，我們在基礎的最後會講到。