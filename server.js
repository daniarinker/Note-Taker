const express = require("express");

//changed var to const below
const path = require("path");
const app = express();
const fs = require("fs");

const PORT = process.env.PORT || 8080;

const notesDB = fs.readFileSync("./db/db.json");
const notes = JSON.parse(notesDB);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(express.static("db"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  return res.send(notes);
});

// //added js routes required below
// require("../routes/htmlRoutes")(app);
// require("../routes/apiRoutes")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
