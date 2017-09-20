import Hapi from 'hapi'

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
    reply('hello world!')
  }
})

// サーバーを開始する
server.start()
