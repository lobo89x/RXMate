const express = require('express');
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
var db = require("./models");
var app = express();



const PORT = process.env.PORT || 9002;

app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
const routes = require("./controllers/searches_controller.js");
app.use(routes);

const updateRoutes = require("./controllers/updateData_controller");
app.use(updateRoutes);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});


module.exports = app;