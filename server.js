const express = require("express");

//changed var to const below
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
const notesDB = fs.readFileSync("./db/db.json");
const notes = JSON.parse(notesDB);

app.use(express.static("public"));
app.use(express.static("db"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.send(notes);
});

// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote["id"] = newNote.title + notes.length;
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  return res.json(newNote);
});

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

//At this time, this delete route needs to be reworked. It is not deleting notes from the database correctly and I am not sure why.
//Circle back to fix this delete route.
app.delete("/api/notes/:id", function (req, res) {
  const delNote = req.params.id;
  const data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const filteredData = data.filter((note) => note.id != delNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(true);
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
