
## *ngIf

我們將學習到，不再使用css來做顯示與隱藏了，是靠著我們變數的操控來達到這個需求。

```ts
// demo.component.ts
export class AppComponent {
    
    public HERE_IS_VAR_IN_COMPONENT:string="pen pie apple apple pen";

    public show:boolean=true;
}
```

```html
<div>
    <p *ngIf="show"> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 如果變數show為true會顯示pen pie apple apple pen -->
</div>
```