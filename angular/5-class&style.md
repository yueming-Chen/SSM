## class與style

在angular中，加入class與樣式已經沒有以往native那麼複雜了，直接用變數去雖稱就好了，物件如果是true，ngClass可以賦予相對的類別，ngStyle亦之。

然而更強大的事`[class.what-tou-want]="variable"`，我們如果只需要操控一個變數，那麼做這個很乾淨的接口，前面寫著class後頭是你要的類別名稱，後面可以直接加上參數或者boolean，就可以很容易就上手這個功能。

```html
<div>
    <some-element [ngClass]="'first second'">...</some-element>

    <some-element [ngClass]="['first', 'second']">...</some-element>

    <some-element [ngClass]="{'first': true, 'second': true, 'third': false}">...</some-element>

    <some-element [ngClass]="stringExp|arrayExp|objExp">...</some-element>

    <some-element [ngClass]="{'class1 class2 class3' : true}">...</some-element>
    
    <some-element [ngStyle]="{'font-style': styleExp}">...</some-element>

    <some-element [ngStyle]="{'max-width.px': widthExp}">...</some-element>

    <some-element [ngStyle]="objExp">...</some-element>
    
    <div [class.class1]="true" [style.width]="200">...</div>
</div>
```