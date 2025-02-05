
import database from './../databases.json' assert { type: 'json' };
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANGUAGE = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController()

terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLooping() {
  try {
    const answer = await terminalController.question('what?')
    //console.log('answer')
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log("process finished!")
      return
    }
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    //console.log('person', person.formatted(DEFAULT_LANGUAGE))
    return mainLooping()
  } catch (error) {
    console.error("Deu ruim", error)
    return mainLooping()
  }
}


await mainLooping();



