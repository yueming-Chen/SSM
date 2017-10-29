## hostbinding & hostlistener

既剛剛的事件觸發，這一次如果要對所有點擊事件作觸發，我們就可以用hostlistener來做，而如果要對class或屬性做binding，可以用hostbinding來做。

```ts
@HostBinding('class.click-disable')
  private _disable: boolean = false;

@HostListener('click',['$event.target'])
onClick($event){
    conosle.log(6666);
}
```