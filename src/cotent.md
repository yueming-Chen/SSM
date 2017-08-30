## 淺談content與view的差別

### view的作用域

網路上其實有一些篇章的出現，那不是那麼多，而且寫得非常的文言文，我來用比較直白的語言來解釋一下他會在那裡被捉取到。

我們先用簡單的`component`來做示範，我們的元件裡頭，沒有什麼複雜的結構，只有一個單純的`button`並且`直接(非常重要)`放置在我們的template中，

```pug
//- template  
default-component
  button(#button_show="")
  //- 此邊用法只有在pug才需要加入=""，如果是html 直接加入 #button就好了
```

我們可以簡單地看到，我們的`button`直接被放置在我們的`component`中，我們可以藉由`viewChild`來抓取到，而捉取回來的型別會是你所指定的元件，底下簡單地展示給大家看。

```ts
// template.ts

@component({
  selector:'default-component'
})

export class defaultComponent{
  @ViewChild('button_show')
  public viewTemplate = null;

  ngAfterViewInit(){
    // viewchild會在執行afterviewinit之前被呼叫  
  }
}
```

我們用更經典有許多網站所提供的父子component來做範例，大家會更好理解一點。

此段程式碼，擷取來自learnangular2

```ts
//- CHILD.COMPONENT.TS  
@Component({
  selector: 'user-profile'
})

export class UserProfile {
  constructor() {}
  sendData() {
    //send data
  }
}

```
這邊我們設定一個子項目（這樣翻譯洽當嗎哈哈），裡頭有什麼不重要，重要的是我們怎麼去抓他出來。

```ts
//- PARENT.COMPONENT.TS 
import { Component, ViewChild } from '@angular/core';
import { UserProfile } from '../user-profile';

@Component({
  template: '<user-profile (click)="update()"></user-profile>',
})
export class MasterPage {
  // ViewChild 會帶著類別型態或者是位址的名稱
  @ViewChild(UserProfile) userProfile: UserProfile

  constructor() { }

  ngAfterViewInit() {
    // 當view初始化完之後，update就可以使用
    this.update();
  }

  update() {
    this.userProfile.sendData();
  }
}
```

這邊我們用到的事viewchild，我們可以看見我們的裝飾字裡頭（decorator，就是那個`@`）裡面可以直接放不只文字，型別也可以，真的滿像javascript的queryselector，在afterviewinit就可以直接呼叫出來，如果有多個，就可以使用`ViewChildren()`，就可以得到一個`querylist<yourcomponentorblablabla>`。

### content的作用域 

view在前面都說是直接了，那麼content就是不直接，但要如何不直接，我們就要使用`ng-content`，我們用前面的程式碼來做修改，讓大家可以了解一下，所謂的間接是怎麼發生。

```ts
//- CHILD.COMPONENT.TS  
@Component({
  selector: 'user-profile'
})

export class UserProfile {
  constructor() {}
  sendData() {
    //send data
  }
}

```

我們的一號主角，仍然不變的是他！接下來是變比較多的第二女主角

```ts
//- PARENT.COMPONENT.TS 

@Component({
  selector:'parent',
  template: 'ng-content',
})
export class MasterPage {
  // 這裡我們改用contentchild
  @ContentChild(UserProfile) userProfile: UserProfile

  constructor() { }

  ngAfterContentInit() {
    
  }

}
```
這裡比較不一樣是，content是在aftercontent前呼叫的，跟view有所不同。

```pug
//- appcomponent.pug

parent
  user-profile((click)="update()")
```

```ts
//- appcomponent.ts
.
.
.
  update() {
    this.userProfile.sendData();
  }
.
.
.
```

我們就可以更有彈性的去加入component，並且在parent中，放入我們的控制項，而一蓋的傳統，`viewchildren`跟`contentchildren`都是一樣的用法，希望大家對view跟content有更近一步的見解！