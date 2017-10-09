import cookie from 'cookies-js'

export default {
  get (name) {
    return cookie.get(name) || undefined
  },

  set (name, value, options = {}) {
    // cookie-js の API ではミリ秒単位でなく秒単位なので
    if (options.expires) {
      options.expires /= 1000
    }

    cookie.set(name, value, options)
  }
}
