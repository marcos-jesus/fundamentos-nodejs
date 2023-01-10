import http from 'node:http'
import { Transform } from 'node:stream'

class TransformUploadFileMusic extends Transform {
  _transform(chunk, encoding, callback) {

    const getFile = Number(chunk.toString() * -1)

    console.log(getFile)
    callback(null, Buffer.from(String(getFile)))

  }


}

const server = http.createServer(async(request, response) => {

  const buffers = []

  for await( const chunk of request) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent)

  return response.end(fullStreamContent)
  //return request.pipe(new TransformUploadFileMusic()).pipe(response)
})

server.listen(3001)