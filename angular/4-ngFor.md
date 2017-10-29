在jquery時代，append將東西顯示出來其實是非常好效能的事情，畢竟直接操作dom，現在ng經由`ngfor`優化來做進一步的渲染，不只語法更簡單，同時速度更快速。

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
       這裡有 {{idx}} 為 {{item}}
    </p>
</div>
```

:::danger
如果遇到大量的資料，要善用分頁，不然再怎麼優化是沒有什麼用處的。
:::