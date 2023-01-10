import { Readable, Writable, Transform } from 'node:stream'

class ReadUploadFileMusic extends Readable {
  index = 1

  _read() {
    const i = this.index++
    
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const BufferI = Buffer.from(String(i))

        this.push(BufferI) // => Chunk 
      }

    }, 1000)
  
  }

}

class WriteUploadFileMusic extends Writable {
  _write(chunk, encoding, callback) {
    
    console.log(Number(chunk.toString()) * 10)
    callback() // => Encerra tudo que precisava ser executado
  }

}

class TransformUploadFileMusic extends Transform {
  _transform(chunk, encoding, callback) {

    const getFile = Number(chunk.toString()) * -1
    const BufferT = Buffer.from(String(getFile))

    callback(null, BufferT) // => Param 1 (Erro), Param 2 (Dado a ser processado)

  }
}

new ReadUploadFileMusic()
  .pipe(new TransformUploadFileMusic())
  .pipe(new WriteUploadFileMusic())

  // Buffer => Forma de transicionar dados entre streams para não enviar streams inteiros.
