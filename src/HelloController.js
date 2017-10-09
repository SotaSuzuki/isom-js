import Controller from './lib/Controller'
import nunjucks from 'nunjucks'

function getName(request) {
  // デフォルト値を設定する
  let name = {
    fname: 'Sota',
    lname: 'Suzuki'
  }

  // パスパラメーターを分解する
  let nameParts = request.params.name ? request.params.name.split('/') : [];

  // 値の優先順位
  // 1. パスパラメーター
  // 2. クエリ文字列
  // 3. デフォルト値
  name.fname = (nameParts[0] || request.query.fname) || name.fname
  name.lname = (nameParts[1] || request.query.lname) || name.lname

  return name
}

export default class HelloController extends Controller {

  toString (callback) {
    nunjucks.render('hello.html', getName(this.context), (err, html) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, html)
    })
  }
}
