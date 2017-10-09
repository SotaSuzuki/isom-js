import Application from './lib'
import HelloController from './HelloController'
import nunjucks from 'nunjucks'
import options from './options.client'

nunjucks.configure(...options.nunjucks)

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  // コントローラーからのレスポンスを埋め込む先の要素を示す CSS のセレクタ
  target: options.target
})

application.start()
