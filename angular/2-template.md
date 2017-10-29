
如果有學過`ROR` 應該會對他的`ERB`不陌生，angular也有自己一套的helper，但避免太過於複雜，這裡用簡單的方式來介紹template。

我們要將ts中的變數，綁定至我們的`html`中，angular是一個以大括號來做解析，我們只要將大括號加入即可，這邊跟初代angularJS用法一樣

```typescript=
// demo.component.tsw
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

```htmlmixed=
<div>
    <p> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 會顯示pen pie apple apple pen -->
</div>
```