import Application from './lib'
import HelloController from './HelloController'
import nunjucks from 'nunjucks'

nunjucks.configure('/templates')

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  // コントローラーからのレスポンスを埋め込む先の要素を示す CSS のセレクタ
  target: 'body'
})

application.start()
