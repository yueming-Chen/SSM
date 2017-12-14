## 楔子

請原諒我這次的標題寫的那麼直白，這有非常的細節我省略了，而那些細節是非常巨大且複雜的系統所組成，希望在裏頭有什麼疑問都可以提出來。

# angular deploy

在網路應該常常會看到將自己的應用程式部屬到伺服器，但是部屬到`github`的確幾乎都是用清一色已經失效的`angular-cli-ghpages`，與其使用套件我們不如自己寫來佈署。

很多人會誤會自己是用`ng serve`來啟用，但其實該是用`ng build`，並且讓`apache`或是`ngnix`來提供http的render，我們最簡單的作法是將打包好的檔案，使用`WEB-SERVER`來做執行，但在`github`(或`gitlab`)中，我們不需要這麼麻煩。

我們得先了解github中的運作是使用`jekyll`來執行，他會直接忽略`vendor`或者`bundle`，所以我們得在自己的檔案加上空的檔案，檔名為`.nojekyll`，而你可以將CI撰寫在github支援的`_config.yml`中，如果你是使用`angular-cli`，或許可以參考一下我寫的簡短的自動部署程式碼。

```yml
ng build --base-href=./ 
```

我們更進一步的要去設定`github`中`gh-page`設定需要打開，這邊我就不累述了，網路上會有很多教學如何打開`gh-page`的教學，但我們不需要新開一之分支，我們需要的是將設定調成`master/docs`，我們就可以將靜態檔案放置在docs，並且讓`jekyll`在這抓取到靜態檔案，所以我們得將我們編譯後的檔案放置在這個資料夾，這樣就大功告成了！

上述有非常多簡便的卻滿複雜的觀念，其實用三言兩語帶過有點太過於簡單，但對於只是要將angular放上github作展示的人，這個很簡單了，我接下來提供懶人包以及demo專案。

- 1 上傳專案至github
- 2 啟動你的`gh-page
> setting->GitHub Pages，Source選擇`master branch /docs folder`，上面就會是佈署完後你的網站了。
- 3 將你的根目錄加入`.nojekyll`
> 如果有疑慮可以參考專案提供的`.nojekyll`，裏頭真的是空的LOL
- 4 加入自己的CI檔案
> github支援的檔名是`_config.yml`，在這提供我簡單撰寫的程式碼

```yml
rm -rf ./docs
ng build --base-href=./ 
mv ./dist ./docs 
```

> 完成！這樣就可以在剛剛我們提到的網址進去看我們的成品囉！

## summary

簡單的github demo可以讓你的專案呈現更活潑，不用再看那些專案元件的臉色，或者自己想去使用卻沒有能力去幫忙維護套件的失落感，從這一步開始幫助自己，將自己的專案放上網上並且展示，接受輿論的同時，可以讓自己的程式碼更有品質與更好的邏輯。

如果覺得沒有介面去控管，可以使用`travis CI`來管理，會是非常好的，不管是在自動編譯成功或失敗都會有郵件通知！

最後也感謝那些努力在npm中提供自動佈署套件的開源者們，我也曾經很仰賴，雖然有時候並不是那麼好用，但是你們走在前端為後輩開源，絕對是整個網路的社群的先鋒。

[專案位置](https://github.com/yueming-Chen/deployNG)

[專案展示](https://yueming-chen.github.io/deployNG/)


