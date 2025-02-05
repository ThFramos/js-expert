import chalk from 'chalk'
import ChalkTable from 'chalk-table'
import Draftlog from 'draftlog'


import readLine from 'readline'
import Person from './person.js'

export default class TerminalController {

  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language) {
    Draftlog(console).addLineListener(process.stdin)

    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))

    const table = ChalkTable(this.getTableOptions, data)

    this.print = console.draft(table)
    this.data = data
  }

  updateTable(item) {
    this.data.push(item)
    this.print(ChalkTable(this.getTableOptions(), this.data))
  }
  question(msg = "") {

    return new Promise(resolve => this.terminal.question(msg, resolve))

  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      lefPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("kmTraveled") },
        { field: "from", name: chalk.cyan("from") },
        { field: "to", name: chalk.cyan("To") },

      ]
    }
  }
}