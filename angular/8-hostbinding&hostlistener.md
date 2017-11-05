## hostbinding & hostlistener

既剛剛的事件觸發，這一次如果要對所有點擊事件作觸發，我們就可以用hostlistener來做，而如果要對class或屬性做binding，可以用hostbinding來做。

這兩個功能多用在`@directive`上面，整個元件的監聽，這一點在沒使用好，會造成滿大的影響，比如說`click`的雙重定義，在除錯的過程將會非常的難進行，但是對於event的精準操作很容易使用。


```ts
@HostBinding('class.click-disable')
  private _disable: boolean = false;

@HostListener('click',['$event.target'])
onClick($event){
    this._disable = true;
    conosle.log(6666);
}
```

我們將我們元素加入tag，並且去監聽他的屬性，將他的屬性那為一個變數，我們在將點擊事件註冊後，如果有點擊就改變變數的值，這麼複雜的功能，我們只要幾行程式碼就能解決，這個有關於es6的`decorator`會比較難理解一點。

## summary

簡單來說

> @HostListener
> 提供監聽`事件`，並且在optional中，可以指定事件來做，並且在$event中取得事件資訊。

> @HostBinding
> 提供監聽`屬性`，並且提供boolean去操作監聽的屬性