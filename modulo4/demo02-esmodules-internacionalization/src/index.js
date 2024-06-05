import Draftlog from 'draftlog'
import chalk from 'chalk';
import ChalkTable from 'chalk-table'

import database from './../databases.json' assert { type: 'json' };
import Person from './person.js';

const DEFAULT_LANGUAGE = "pt-BR"
Draftlog(console).addLineListener(process.stdin)

const options = {
  lefPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: chalk.cyan("kmTraveled") },
    { field: "from", name: chalk.cyan("from") },
    { field: "to", name: chalk.cyan("To") },

  ]
}

const table = ChalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANGUAGE)))

console.draft(table)
