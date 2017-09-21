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
  path: '/hello',
  handler: function (request, reply) {
    // テンプレートを読み込み、コンテキストのオブジェクトを与えてコンパイルする
    nunjucks.render('index.html', {
      fname: 'Sota',
      lname: 'Suzuki'
    }, function (err, html) {
      reply(html)
    })
  }
})

// サーバーを開始する
server.start()
