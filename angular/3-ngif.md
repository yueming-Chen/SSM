
## *ngIf

我們將學習到，不再使用css來做顯示與隱藏了，是靠著我們變數的操控來達到這個需求。

以往，我們用簡單的`display:none`與`display:block;`來做，但在官方的解釋，以SPA的角度更希望讓元件能夠在需要顯示時，在出現在你的DOM上，更精細的解釋會在後頭來做解釋。

我們可以看到範例，秀出我們昨天學習到的template，並且將它顯示：

```ts
// demo.component.ts
export class AppComponent {
    
    public HERE_IS_VAR_IN_COMPONENT:string="pen pie apple apple pen";

    public show:boolean=true;
}
```

```html
<div>
    <p *ngIf="show === true"> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 如果變數show為true會顯示pen pie apple apple pen -->
</div>
```

`ngif`用法就跟在下判斷式一樣，你甚至可以用`*ngif="show"`就可以做出顯示了：

```html
<div>
    <p *ngIf="show"> {{ HERE_IS_VAR_IN_COMPONENT }} </p>
    <!-- 如果變數show為true會顯示pen pie apple apple pen -->
</div>
```

當然除了顯示，我們也有像是`vue`的`v-else`，而且我們可以讓關注點更分離，把then與else做出更乾淨的切割，這邊我們可以看見，我們在ngif設定變化參數後，寫下了`then 成立的模板 else 條件不成立的模板`，我們只需要在ng-template中，加入你所設定的模板名稱，並且加入`#`，就可以被捉取到了!

更深入的`ng-template`與`#template_name`這兩個的解析，我們在前導結束後，將有更詳細的教學！現在就先知道如何使用，並且去使用它吧！

```html
<div>
    <p *ngIf="show;then content else other_content">裏頭的值會被忽略 </p>
    <!-- 如果變數show為true會將#content這一個模板的內容顯示，false則會顯示我們設定other這個模板 -->
    <ng-template #content> {{ HERE_IS_VAR_IN_COMPONENT }}.</ng-template>
    <ng-template #other_content> 如果show為false的話，則會顯示這一段</ng-template>
</div>
```