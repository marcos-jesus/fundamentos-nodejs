import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

// Stateful - Stateless

// Stateful => Sempre vai ter alguma informação sendo guardada em memória, e depende dos dados guardado na memória
// Stateless => Não salva nada em memória, se parar e rodar vai se manter igual os dados/arquivos.


const database = new Database()


const server = http.createServer(async(request, response) => {

  const { method, url } = request

  await json(request, response)

  if(method === 'GET' && url === '/users') {

    const users = database.select('users')

    return response.end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {

    const { name, email } = request.body

    const user = {
      id: randomUUID(),
      name: name,
      email: email,
    }

    database.insert('users', user)

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()

})

server.listen(3000)

