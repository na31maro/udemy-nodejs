//console.log('Starting app.js');

const fs = require('fs'); //node default filesystem module 
const _ = require('lodash'); //3rd party module that makes development easier
const yargs = require('yargs'); //3rd party module for parsing CLI arguments (and all other kidns of arguments)

const notes = require('./notes.js'); 

const argv = yargs.argv; //yargs.argv is where the CLI arguments get stored. 
var command = argv._[0]; //Process is a node object. argv represents the array of arguments. //console.log(process.argv); We're using yargs instead. 

//Example command line string: node app.js add --title=secret --body="This is the body." 

//console.log('Command: ', command); 
//console.log('Yargs', argv); 
//console.log('****************');


/*      Command List      */
//Calls different functions in the notes.js file depending on the command passed in. 

if (command === 'add') { 
    var note = notes.addNote(argv.title, argv.body);

    if (_.isEmpty(note)){
        console.log('Error: note not created. Title already in use.');
    } else {
        console.log(`Note created successfully.`);
        notes.logNote(note);
    }
} else if (command === 'list') {
    var allNotes = notes.getAll(); 
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title); 
    if (_.isEmpty(note)){
        console.log('Error: note not found.');
    } else {
        notes.logNote(note);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title)
    //Ternary operator example. 
    //Syntax is: var variable = booleanExpression ? resultWhenTrue : resultWhenFalse
    var message = noteRemoved ? 'Note successfully deleted.' : 'Note not found.';
    console.log(message);
} else {
    console.log('Command not recognized'); 
}

