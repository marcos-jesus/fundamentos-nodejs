import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Query Parameters - https://localhost:3000/users?userId=1&name=Marcos 
// Route Parameters 
// Request Body

// Stateful - Stateless

// Stateful => Sempre vai ter alguma informação sendo guardada em memória, e depende dos dados guardado na memória
// Stateless => Não salva nada em memória, se parar e rodar vai se manter igual os dados/arquivos.

const server = http.createServer(async(request, response) => {

  const { method, url } = request 

  await json(request, response)

  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  if (route) {
    const routeParams = req.url.match(route.path)


    
    return route.handler(request, response)
  }

  return response.writeHead(404).end()

})

server.listen(3000)

