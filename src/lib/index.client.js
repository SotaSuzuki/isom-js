import Call from 'call'
import queryString from 'query-string'

export default class Application {
  constructor (routes, options) {
    // コントローラーを取得するためのテーブル
    this.routes = routes
    this.options = options
    // call のルーターをインスタンス化する
    this.router = new Call.Router()
    this.registerRoutes(routes)
  }

  registerRoutes (routes) {

    // テーブルの全項目をルーターに登録する
    for (let path in routes) {
      this.router.add({
        path: path,
        method: 'get'
      })
    }
  }

  navigate(url, push = true) {
    // History API に対応していないブラウザは location に URL をセットして終了する
    if (!history.pushState) {
      window.location = url
      return
    }

    // パスとクエリ文字列を分割する
    let urlParts = url.split('?')
    // 分割された URL を変数にセットする
    let [path, search] = urlParts
    // パスがルーターに登録されているかチェックする
    let match = this.router.route('get', path)
    // パス本体とパスパラメータを変数にセットする
    let { route, params } = match
    // テーブル routes でコントローラーのクラスを探索する
    let Controller = this.routes[route]

    if (route && Controller) {
      const controller = new Controller({
        query: queryString.parse(search),
        params: params
      })

      // リクエストとレスポンスを表すオブジェクト。ファサードはのちに実装する。
      const request = () => {}
      const reply = () => {}

      controller.index(this, request, reply, (err) => {
        if (err) {
          return reply(err)
        }

        controller.render(this.options.target, (err, response) => {
          if (err) {
            return reply(err)
          }

          reply(response)
        })
      })

      // push 引数が true の場合にのみ、履歴のスタックにプッシュする
      if (push) {
        history.pushState({}, null, url)
      }
    }
  }

  start() {
    // PopStateEvent のイベントハンドラを作成する
    this.popStateListener = window.addEventListener('popstate', (e) => {
      let { pathname, search } = window.location
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
