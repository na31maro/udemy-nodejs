//console.log('Starting notes.js');

const fs = require('fs'); 

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json'); 
        return JSON.parse(notesString);
    } catch (e) {
        //If the above code fails, this is ok because that means notes-data didn't exist, and 
        //notes is already defined as an empty array. 
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}; 

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    /*Filter is an array method that takes a callback. 
    This callback function gets called once for every item in the array. 
    Essentially we are looping over every item in notes. We pass our note variable into the callback 
    function, and check every existing item to make sure no titles match. We return TRUE if a title matches. 
    Returning TRUE will put the duplicate item in the duplicateNotes array. The typical outcome would be that 
    duplicateNotes comes back empty. */
    var duplicateNotes = notes.filter((note) => note.title === title);  

    if (duplicateNotes.length === 0) { 
        notes.push(note); //push lets you add to the end of an array 
        saveNotes(notes);

        return note;
    }
};

var getAll = () => {
    return fetchNotes();  
}

var getNote = (title) => {

    var notes = fetchNotes(); 
    var note = notes.filter((note) => note.title === title);

    return note[0]; 
}

var removeNote = (title) => {
    var notes = fetchNotes(); 
    var filteredNotes = notes.filter((note) => note.title !== title);  
    saveNotes(filteredNotes); 

    //If filtered is same length as original, this returns false because no note was deleted. 
    return notes.length !== filteredNotes.length; 
}

var logNote = (note) => {
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

//module.exports is what is brought over into app.js (or other files) when "require('./notes.js')" is called. 
module.exports = { 

    /*Typically you'd do this: "addNote: addNote" where the left side is what is called external (ex. notes.addNote() ) and the right side is the function in this 
    file that is called when that happens. In ES6, if those two values are the same, you can just write the single value. ex. "addNote" */
    
    addNote, 
    getAll,
    getNote,
    removeNote,
    logNote
}