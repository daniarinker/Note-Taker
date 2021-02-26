
// * The following API routes should be created:

// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notesDB);
      });

      app.get("/api/notes:id", function(req, res) {
          res.json(notesDB[req.params.id]);
      });

      app.post("/api/notes", (req, res) => {
        const newNote = req.body;
        newNote["id"] = newNote.title + notes.length;
        notes.push(newNote);
        fs.writeFileSync('./db/db/json', JSON.stringify(notes));
        return res.json(newNote);
      });
      
      app.post("/update/:id", (req, res) => {
        
      });


      app.delete("/api/nodes/:id", function(req,res) {
          notesDB = notesDB.filter(notes => {return notes.id != req.params.id)
      });
fs.writeFileSync("./db/db.json", JSON.stringify(notesDB), (err) => {
    if (err) throw err;
});
res.json(notesDB);

    });
}

