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
  notesDB.push(body);
  res.json(notesDB)
});


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
