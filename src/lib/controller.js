export default class Controller {

  constructor (context) {
    this.context = context
  }

  // index メソッドはコントローラーのインスタンスにとってのデフォルトのアクションとなる
  //
  // 各引数の役割
  // 1. application
  // ルーティングを定義したアプリケーションへの参照をあらわす。
  // 2. request
  // hapi の request オブジェクト。将来的にはこのオブジェクトが共通化され、クライアントとサーバーの双方で同様に利用できるようになる。
  // 3. reply
  // hapi の reply オブジェクト。request と同様に将来的に共通化される。
  // 4. callback
  // Node.js 形式のコールバック関数をあらわす。コールバック関数が呼び出された際に最初の引数が null だった場合、アクションメソッドを呼び出したハンドラはライフサイクルの中を以降の処理へと進む。
  index (application, request, reply, callback) {
    callback(null)
  }

  toString (callback) {
    callback(null, 'success')
  }

  render (target, callback) {
    this.toString(function (err, body) {
      if (err) {
        return callback(err, null)
      }

      document.querySelector(target).innerHTML = body
      callback(null, body)
    })
  }
}
