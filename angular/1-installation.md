###楔子

妳一把抄起旁邊的跨劍像我腰間斬去，時間忽然凍結，我連動都不動，享受最後與你對視的時光，最後刀光停留在我臉上，腰際旁顫抖的是薄怒的容顏與驚慌，不捨地往你臉上弗去。

### 要多快有多快

這一篇不包含`webpack`或者`gulp`之類方便的工具，而是要介紹更方便的叫做ng-cli的傢伙

這傢伙有多兇殘，包含零零碎碎的bundle以及單元測試等等，如果實務經驗比較少的朋友，也可以使用可Angular CLI快速產生開發Angular2程式時所需要的檔案範本，整個開發速度超級快速。

首先安裝我們的大主角ng cli
```
npm install -g @angular/cli
```

選擇一個你中意的地方進入，new會花上你一些時間，幫你`npm`設定好typescript，最大的痛點就是幫你設定好tsconfig之類的，真的不是那麼好設定，ng2好啟動(如果使用js版本的話)，但ts真的不好啟，如果有走過`GRANT`或者`GULP`啟動過的你就了解到這有多難受。

```
ng new 'your project name'
cd 'PROJECT_NAME'
ng serve
```
![success.png](http://user-image.logdown.io/user/18836/blog/18351/post/1680465/5PjMBGbGS72LhYqFwcx7_success.png)
看見這個畫面後就可以立即打開了，預設的port是在`localhost:4200`，如果想要改回習慣的3000的話

```
ng serve --host 0.0.0.0 --port 3000
```

### 強大的重頭戲

他強大的地方不只是他建立很方便，他連做`component`或者`directive`都很方便！只需要輸入下面的指令

```
ng g component newComponent
ng g pipe greatPipe
ng g module my-module
```

是不是超級方便，真的滿狂的整合，如果往後還有什麼問題可以直接打`ng help`就可以直接搜尋指令了，如果對於開發中的模組，解决方法就是在全域的`node_modules`資料夾中，製造連結去指向，只要輸入`npm link @angular/cli`，導入到現在資料夾的模組中。