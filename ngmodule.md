## NgModules


ngmodules可以將應用程式組織成一個一個區塊的功能。

ngmodule 是一個加上`@NgModule`裝飾函數的類別。`@NgModule`會帶著metadata的物件，此物件會對`angular`溝通他是如何編譯與執行。他定義了`components`,`directive`與`pipes`，給予這些公用函數可以使用。`@NgModule`可能要增加`service providers`至應用程式的依賴注入。這裡還有許多的選擇可以被使用。


在閱讀之前，先閱讀root module，它介紹了`ngmodules`與必要的產生與維護一個整個應用程式的單一`root appmodule`

## angular 模組

許多`angular`的函式庫是模組（FormsModule, HttpModule, and RouterModule...etc）。許多第三方的函式庫也能在`ngmodules`使用( Material Design, Ionic, AngularFire2...etc)

`ngmodules`將components,directive與pipes集合成一個聚合性功能的區塊，每一個專注在自己的特性，應用程式的商業領域，工作流程與所有共通的效用

modules 也可以增加service至應用程式中。每個service可能在內部開發，比如說程式日誌。service可以來自外部來源，像是angular router與http client。

module 可以被漸進地載入當程式被開啟。載入也可以藉由router來實現非同步的lazy loaded。

An NgModule is a class decorated with @NgModule metadata. The metadata do the following:

ngmodule是帶著`@NgModule metadata`的類別修飾字。`metadata`會依照下面執行：

- 宣告這個模組有屬於他的components,directives與pipes。
- 產生一些公用類別，其他的模板可以使用。
- 匯入其他的帶著component,directives和pipes的module。
- 提供在應用層的service，讓所有應用程式的component可以使用。

所有angular app至少擁有一個`module class`,比如說`root module`.藉由module執行應用程式來啟動app。

在根模組是所有你必須的簡單的應用程式，應用程式會與一些`component`包著。像是app開始壯大，你重構根模組去那些所有有關聯功能性的特定模組。你會匯入一些模組至根模組。

下一篇章，你會讀到關於他如何運作，現在，我們從root module開始。

### root Modules

每個angular都會擁有一個根模組類別（`root module class`）。按照慣例，根模組類別會被`appmodule`所呼叫，而根模組會被命名為`app.module.ts`

`appmodule`可以這樣在下面範例程式，用最小化程式來執行。

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

`@NgModule` 裝飾字定義了模組的`metadata`。這一頁會帶著直覺的解法讓你了解metadata與檔案細部的過程。

metadata匯入了`BrowserModule`，這是一個`single helper`的模組，每個瀏覽都需要將他匯入。

`BrowserModule`註冊了主要的應用程式的service provider。他也包含了常見的directive像是ngif,ngfor，他會變成即時可視化與跨模板的功能性。

`declarations`列出所有app的component,root component,最上層的app會將component樹暴露。

範例僅顯示如何資料雙向：

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>{{title}}</h1>',
})
export class AppComponent {
  title = 'Minimal NgModule';
}
```
最後 `@ngmodule` 啟動所有被`AppComponent`定義過的元件，像是啟動元件(`bootstrap component`)。當angular啟動app，他會在index.html中抓到`<my-app>`的html標籤，渲染html至dom中。

## Bootstrapping in main.ts

你藉由啟動在`main.ts`的`appmodule`去執行程式。

angular在多個平台上提供多種啟動選項。這裡說兩種選擇，都是針對於瀏覽器的

### Compile just-in-time (JIT)

藉由platformBrowserDynamic去動態產生

### Compile ahead-of-time (AOT)

靜態會比動態更快速，尤其是在手機裝置與網速較慢的環境
藉由AppModuleNgFactory去產生

預執行`AppModuleNgFactory`的語法與動態啟動`appmodule`相似。

```ts
// The browser platform without a compiler
import { platformBrowser } from '@angular/platform-browser';

// The app module factory produced by the static offline compiler
import { AppModuleNgFactory } from './app/app.module.ngfactory';

// Launch with the app module factory.
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

因為先編過了，所以可以把angular-compiler省下來。
下載速度與執行速度會比動態產生的快很多，完全是效能表現的指標！

兩個啟動方式都會產生`AppModuleNgFactory`，jit會在運作中儲存在記憶體或瀏覽器中，aot會將實際檔案產出在main.ts並且產出。

### 宣告directive與component