## 有痛四五痛的升級之路

萬聖節隔天發布`angular5.0.0 releas` 正式發布，馬上打臉我昨天的文章，而且我還沒有去查證，看來angular沒有馬上更新。

### 與我們生手有關的更新

#### [ngFor] 被取消，[ngForOF]篡位

在5.0.0直接被取消啦！其實看到超級想罵髒話的哈哈哈哈哈，所以我們昨天的ngFor都得使用`[ngForOf]`，而且沒辦法直接~~附身~~使用`htmlElementTag`，得使用`ng-template`去做渲染。

下方的程式碼，起手式是在`ng-template`加上`ngFor`與`[ngForOf]`，接下來是將`[ngForOf]`的接口接上你要的資料，然後用`let-item=""`，第一個空白的將被默認是抓取到陣列的值，我們用sample-2的程式碼來解釋，我們先看看如何運作。

```tyescript
public data:string[] = ['apple','pig','banana','cat']; 
```

```html
<ng-template ngFor [ngForOf]="data" let-item="">
    <p>{{item}}</p>
</ng-template>
```

```javascript
// sample-2 
let data = ['apple','pig','banana','cat']; 

for(let data of item){
    // let-item="" 就如同這段程式碼，item就是對應到迴圈的item
    console.log(item);
}
```

#### ngOutletContext 被 NgTemplateOutlet 取代

雖然大家對這個很陌生，但這一點雖然在進階課程會提到，而且很多sample code得修改，教學的後段很多template的觀念都會使用到這個參數，所以這幾天得對文章做大量的修改。

### 嗨老人，微懶人包看這

> Angular Universal State Transfer API and DOM Support SSR更貼近我們生活

> Compiler Improvements 
預設AOT有夠6
> - Preserve Whitespace 
有關檔案大小，可以編譯拿掉空白囉

> HttpClient
http被拿掉用這個取代囉

> CLI v1.5 上線啦！