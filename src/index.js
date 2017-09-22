import Hapi from 'hapi'
import nunjucks from 'nunjucks'

// Nunjucks がテンプレートを読み込むパスを設定する
nunjucks.configure('./dist')

// ホスト名とポート番号を指定してサーバーを作成する
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

// ルーティングを設定する
server.route({
  method: 'GET',
  // path: '/hello/{fname}/{lname}',
  path: '/hello/{name*}',
  handler: function (request, reply) {
    // テンプレートを読み込み、コンテキストのオブジェクトを与えてコンパイルする
    console.log(request.params) // request.params でパスパラメーターを取得できる
    console.log(request.query) // request.query でクエリ文字列へアクセスができる

    nunjucks.render('index.html', getName(request), function (err, html) {
      reply(html)
    })
  }
})

// サーバーを開始する
server.start()

function getName (request) {
  // デフォルト値を設定する
  let name = {
    fname: 'Sota',
    lname: 'Suzuki'
  }

  // パスパラメーターを分解する
  let nameParts = request.params.name ?  request.params.name.split('/') : [];

  // 値の優先順位
  // 1. パスパラメーター
  // 2. クエリ文字列
  // 3. デフォルト値
  name.fname = (nameParts[0] || request.query.fname) || name.fname
  name.lname = (nameParts[1] || request.query.lname) || name.lname

  return name
}
