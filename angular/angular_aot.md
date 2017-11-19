# The Ahead-of-Time (AOT) Compiler

`AOT`在瀏覽器下載與執行之前，就先建置並將專案中的`html`與`ts`編成高效率的`js`。

angular 元件包含著大量的元件與html的模板。在瀏覽器渲染之前，元件與模板需要被`angular`編譯器轉換成可以執行的`js`。

angular提供了兩個方式去編譯你的程式：

即時編譯(JIT)，在瀏覽器中，會在執行階段編譯程式。
預先編譯(AOT),會在建置階段，編譯程式。

## Why compile with AOT?

### 快速渲染

使用`aot`，瀏覽器下載了一個預編譯版本的程式。瀏覽器會去載入可執行的程式碼所以可以快速渲染到程式，而且省下編譯的時間。

### 較少的非同步需求

編譯器將額外的html模板與css以`inline`的方式放進程式`js`中，消除這些檔案的零碎`ajax`請求

## 檔案大小降低

已經不需要下載`angular`編譯器如果你的程式碼已經經過編譯。編譯器很粗略的省了一半，所以可以省下動態程式運作的時間成本。

## 更容易偵測模板錯誤

在使用者看到之前，`aot`的編譯器會在建置階段針對模板的綁定進行偵測與紀錄。

Better security

AOT compiles HTML templates and components into JavaScript files long before they are served to the client. With no templates to read and no risky client-side HTML or JavaScript evaluation, there are fewer opportunities for injection attacks.


