import http from 'node:http'

// Stateful - Stateless

// Stateful => Sempre vai ter alguma informação sendo guardada em memória, e depende dos dados guardado na memória
// Stateless => Não salva nada em memória, se parar e rodar vai se manter igual os dados/arquivos.

const users = []

const server = http.createServer(async(request, response) => {

  const { method, url } = request

  const buffers = []

  for await( const chunk of request) {
    buffers.push(chunk)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }

  console.log(request.body)

  if(method === 'GET' && url === '/users') {
    return response
    .setHeader('Content-type', 'application/json')
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

