const fs = require('fs')
const chalk = require('chalk')


// Add note command 
const addNote = (title, body) => {
    const notes = loadNotes()
    
    const sameNote = notes.find((note) => note.title === title)
    
    if (!sameNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green('Note added'))
    } else {
        console.log(chalk.red('Same title !'))
    }
}

// remove --title="yoo" command
const removeNote = (title)=> {
    const notes = loadNotes()
    const removed = notes.filter((note) => note.title !== title)
    
    if (removed.length === notes.length) {
        console.log(chalk.red('note not removed'))
    } else {
        console.log(chalk.blue('Note removed'))        
        saveNotes(removed)
    }    
}

// list command 
const listNotes = () => {
    console.log(chalk.yellow('Your Notes:'))
    const notes = loadNotes()
    notes.forEach((note)=> {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title)
    if (readNote) {
        console.log(chalk.blue(readNote.title))
        console.log(readNote.body) 
    } else {
        console.log(chalk.red('Error cannot find note'))
    }
}

// Saves notes to notes.json
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Load notes from notes.json
const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const jsonData = dataBuffer.toString()
        return JSON.parse(jsonData)
    } catch (e) {
        return []
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote : readNote
}