import http from 'node:http'

// Stateful - Stateless

// Stateful => Sempre vai ter alguma informação sendo guardada em memória, e depende dos dados guardado na memória
// Stateless => Não salva nada em memória, se parar e rodar vai se manter igual os dados/arquivos.

const users = []

const server = http.createServer((request, response) => {

  const { method, url } = request

  if(method === 'GET' && url === '/users') {
    return response
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if(method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Marcos Jesus',
      email: 'marcos@gmail.com'
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()

})

server.listen(3000)

