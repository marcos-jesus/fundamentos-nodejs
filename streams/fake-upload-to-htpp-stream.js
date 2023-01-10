import { Readable } from 'node:stream'


class ReadUploadFileMusic extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const BufferI = Buffer.from(String(i))

        this.push(BufferI)
      }

    }, 1000)
  }
}

fetch('http://localhost:3001', {
  method: 'POST',
  body: new ReadUploadFileMusic(),
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})