const express = require("express");
const fs = require("fs");
const path = require("path");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.get("/", require("../routes/apiRoutes"));

app.get("/api/notes", (req, res) => {return res.send(notes);
});

require("../routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });
  