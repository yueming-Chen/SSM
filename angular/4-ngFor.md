##　*ngfor 迴圈渲染

在jquery時代，append將東西顯示出來其實是非常好效能的事情，畢竟直接操作dom，現在ng經由`ngfor`優化來做進一步的渲染，不只語法更簡單，同時速度更快速。

不過在jquery再怎麼調正效能，還是沒有native的效能那麼好，所以在最佳效能上，我們會把一次的`html tag`生成後，在做到`dom`渲染。

在`angular`中，就可以信任原生所提供的`ngfor`，ngfor如果有事用過初代`angularJS`應該不陌生，只要使用與javascript非常雷同的`let items in item`，就可以像在程式中顯示出來了，這個也是angular的靈魂！

```ts
// demo.component.ts
export class AppComponent {
    
    public HERE_IS_VAR_IN_COMPONENT:string="pen pie apple apple pen";

    public show:boolean=true;
    public items:string[]=['pen','pie','apple','apple','pen'];
}
```

```html
<div>
    <p *ngIf="show"> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 如果變數show為true會顯示pen pie apple apple pen -->
    <p *ngFor="let item of items;let idx = index;">
       我擁有 {{item}} ~
    </p>
</div>
```

更便利的是，如果想要順道將index印出來，只要在後頭宣告一個變數為`index`即可，是不是很方便阿！其實不只有這個保留字，還有如`first`可以捉取陣列第一個資料，諸如此類但會比較少使用到。

```html
<p *ngFor="let item of items;let idx = index;">
    這裡有 {{idx}} 為 {{item}}
</p>
```

最後比較值得注意的是，這個語法在`angular4.0 release`已經被`[ngForOf]`所取代，但不用擔心的是現在`angular`還是支援`ngfor`，我們將再進階的章節再來講`[ngForOF]`。

:::danger
如果遇到大量的資料，要善用分頁，不然再怎麼優化是沒有什麼用處的。
:::