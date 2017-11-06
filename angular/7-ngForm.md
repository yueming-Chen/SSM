## ngForm

angular把form這一塊整合的非常好，不只整合好了submit，驗證也包含在裡頭，這一次的範例是沒有驗證的實例。

`forms`在商業的應用很多，後台的應用更多，填資料、登入之類的，都可以用angular提供的forms來做掉，我們用最簡單提供的`formcontrol`來實現。

```ts
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
 
@Component({
  selector: 'example-app',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>
      <input name="first" ngModel required #first="ngModel">
      <input name="last" ngModel>
      <button>Submit</button>
    </form>
    
    <p>First name value: {{ first.value }}</p>
    <p>First name valid: {{ first.valid }}</p>
    <p>Form value: {{ f.value | json }}</p>
    <p>Form valid: {{ f.valid }}</p>
  `,
})
export class SimpleFormComp {
  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
```

當一切都可以從同一個表單元件做控制，事情就不會那麼複雜了，將多個簡單簡單的應用整合在一起，會很複雜，有form來做這些整合，事情會變簡單很多。