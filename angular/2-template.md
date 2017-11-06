在這裡我們將跳過不少的細節，讓你可以在最簡單的情況下，就玩到angular的template。

如果有學過`ROR` 應該會對他的`ERB`不陌生，angular也有自己一套的helper，但更生的新手應該連`helper`可能都沒有聽過，這邊娓娓道來。

我們以最簡單的說法，就是讓原本的html，可以看懂我們程式中的變數與函式，好比說我在我的程式碼中設定了名為`name`的變數，並且賦予值為`rach`，要讓他顯現出來，我們只需要在html中，使用下列程式碼：

```typescript
public name = 'Rach';
```
```html
<p>{{name}}</p>

```

簡單吧，一個雙大括號，就可以對我們程式中的`method`做呼叫，裡頭也可以做簡單的運算喔！

接下來我們做比較完整的應用，我們要將ts中的變數，綁定至我們的`html`中，這邊跟初代angularJS用法一樣呢！

```typescript
// demo.component.ts
import { Component,Input } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})

export class AppComponent {
    constructor(){
    
    }
    
    public HERE_IS_VAR_IN_COMPONENT:string="pen pie apple apple pen";
}
```

```html
<div>
    <p> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 會顯示pen pie apple apple pen -->
    <p>{{ HERE_IS_VAR_IN_COMPONENT ? '這個裡頭有值' : '什麼裡面是空的！'}}</p>
    <!-- 可以做一個程式邏輯的操作 -->
</div>
```