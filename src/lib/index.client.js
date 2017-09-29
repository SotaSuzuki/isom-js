export default class Application {
  navigate(url, push = true) {
    // History API に対応していないブラウザは location に URL をセットして終了する
    if (!history.pushState) {
      window.location = url
      return
    }

    console.log(url)

    // push 引数が true の場合にのみ、履歴のスタックにプッシュする
    if (push) {
      history.pushState({}, null, url)
    }
  }

  start() {
    // PopStateEvent のイベントハンドラを作成する
    this.popStateListener = window.addEventListener('popstate', (e) => {
      let {pathname, search} = window.location
      let url = `${pathname}${search}`
      this.navigate(url, false)
    })

    // クリックのイベントハンドラを作成する。
    // 条件に一致したら、処理を navigate() メソッドに委譲する
    this.clickListener = document.addEventListener('click', (e) => {
      let { target } = e
      let identifier = target.dataset.navigate
      let href = target.getAttribute('href')

      if (identifier !== undefined) {
        if (href) {
          e.preventDefault()
        }

        // identifier が空でなければこれを使ってナビゲーションを行う。
        // 空なら href 属性の値を使う。
        this.navigate(identifier || href)
      }
    })
  }
}
