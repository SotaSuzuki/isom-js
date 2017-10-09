import Application from './lib'
import HelloController from './HelloController'
import nunjucks from 'nunjucks'
import options from './options'

// Nunjucks がテンプレートを読み込むパス
nunjucks.configure(...options.nunjucks)

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  server: options.server,
  document: options.document
})

// サーバーを開始する
application.start()
