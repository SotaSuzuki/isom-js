export default function (request, reply) {
  // クライアント側の cookies-js でも同様の処理を行っている
  function cleanName (name) {
    name = name.replace(/[^#$&+^`|]/g, encodeURIComponent)
    return name.replace(/\(/g, '%29')
  }

  function cleanValue (value) {
    return (value + '').replace(/[^!#$&-+\--:<-\[]-~]/g, encodeURIComponent)
  }

  return {
    get (name) {
      return request.state[name] && decodeURIComponent(request.state[name]) || undefined
    },

    set (name, value, options = {}) {
      reply.state(cleanName(name), cleanValue(value), {
        isSecure: options.secure || false,
        path: options.path || null,
        ttl: options.expires || null,
        domain: options.domain || null
      })
    }
  }
}
