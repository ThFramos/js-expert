const http = require('http');
const DEFAULT_USER = {
  username: 'Thiago Faria Ramos',
  password: '123456'
}
const lower = (text) => { return text.toLowerCase() }
const { once } = require('events')
const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    return response.end()

  },
  '/login:post': async (request, response) => {
    const user = JSON.parse(await once(request, "data"))

    if (
      lower(user.username) !== lower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401)
      response.end("Log in failed!")
      return
    }
    return response.end("Log in succeeded!")
  },
  default(request, response) {
    response.writeHead(404)
    return response.end('Not found!')
  }
}
function handler(request, response) {
  const { url, method } = request

  const routeKey = `${lower(url)}:${lower(method)}`;
  const chosen = routes[routeKey] || routes.default
  return chosen(request, response)


}

const app = http.createServer(handler)
  .listen(3000, () => { console.log('running') })



  module.exports = app;