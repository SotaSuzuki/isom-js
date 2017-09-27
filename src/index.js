import Hapi from 'hapi'
import Inert from 'inert'
import Application from './lib'
import HelloController from './hello-controller'
import nunjucks from 'nunjucks'

// Nunjucks がテンプレートを読み込むパス
nunjucks.configure('./dist')

// ホスト名とポート番号を指定してサーバーを作成する
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

const APP_FILE_PATH = '/application.js'
server.register(Inert, () => {})
server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/build/application.js')
  }
})

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  server: server,
  document: function (application, controller, request, reply, body, callback) {
    nunjucks.render('./index.html', {
      body: body,
      application: APP_FILE_PATH
    }, (err, html) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, html)
    })
  }
})

// サーバーを開始する
application.start()
