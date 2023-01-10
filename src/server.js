import http from 'node:http'
import { json } from './middlewares/json.js'

// Stateful - Stateless

// Stateful => Sempre vai ter alguma informação sendo guardada em memória, e depende dos dados guardado na memória
// Stateless => Não salva nada em memória, se parar e rodar vai se manter igual os dados/arquivos.

const users = []

const server = http.createServer(async(request, response) => {

  const { method, url } = request

  await json(request, response)

  if(method === 'GET' && url === '/users') {
    return response
    .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {

    const { name, email } = request.body
    users.push({
      id: 1,
      name: name,
      email: email,
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()

})

server.listen(3000)

