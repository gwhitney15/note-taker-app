const express = require('express');
const path = require('path');
const notesDB = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/api/notes', (req, res) =>
  res.json(notesDB));

app.post('/api/notes', (req, res) => {
  const { body } = req;
  req.body.id = uuidv4();
  notesDB.push(body);
  res.json(req.body)
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = (id, notesArray) => {
    const result = notesArray.filter(currentNote => currentNote.id === id)[0];
    return result;
  };
  const deleteNote = (currentNote, notesArray) => {
    const index = notesArray.indexOf(currentNote);
    notesArray.splice(index, 1);
    path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
  };
  const noteDelete = noteId(req.params.id, notesDB);
  deleteNote(noteDelete, notesDB);
  res.json();
})


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
