import Hapi from 'hapi'
import Inert from 'inert'
import path from 'path'
import nunjucks from 'nunjucks'

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
})

// ホスト名とポート番号を指定してサーバーを作成する
server.connection({
  host: 'localhost',
  port: 8000
})

const APP_FILE_PATH = '/application.js'

server.register(Inert)

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: (request, reply) => {
    reply.file('dist/build/application.js')
  }
})

server.route({
  method: 'GET',
  path: '/templates/{template*}',
  handler: {
    file: (request) => {
      return path.join('dist', request.params.template)
    }
  }
})

export default {
  nunjucks: [
    './dist',
    { autoescape: false }
  ],
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
}
