'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {

  watch(event, filename) {

    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString())
// })

const file = new File()
/* dessa forma ignora o this da classe File e herda da classe watch */
//watch(__filename, file.watch)

//alternativa feia
// watch(__filename, (event, filename) => file.watch(event, filename))

//alternativa melhir: deixar explicito  qual é o contexto da funçaõ
// o bind retorna uma função com o 'this' setado
watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call:hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call:hey sinon!') }, [null, __filename])