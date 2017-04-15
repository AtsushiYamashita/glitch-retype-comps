const express = require('express')
const Sequelize = require('sequelize')
const app = express()

// default user list
const users = [
      ["John","Hancock"],
      ["Liz","Smith"],
      ["Ahmed","Khan"]
    ]
let User

// setup a new database
// using database credentials set in .env
const sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // the `.data` directory isn't copied if someone remixes the project.
  storage: '.data/database.sqlite'
})

// populate table with default users
async function setup() {
  await User.sync({force: true}) // using 'force' it drops the table users if it already exists, and creates a new one
    for(var i=0; i<users.length; i++){
      User.create({ firstName: users[i][0], lastName: users[i][1]}); // create a new entry in the users table
    } 
}

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.');
    User = sequelize.define('users', {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    });
    await setup()
  } catch(err) {
    console.log('Unable to connect to the database: ', err)
  }
})()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/users", async (request, response) => {
  var dbUsers=[];
  const users = await User.findAll() // find all entries in the users tables
  users.forEach((user) => {
    dbUsers.push([user.firstName,user.lastName]); // adds their info to the dbUsers value
  });
  response.send(dbUsers); // sends dbUsers back to the page
});

// creates a new entry in the users table with the submitted values
app.post("/users", async (request, response) => {
  await User.create({ firstName: request.query.fName, lastName: request.query.lName});
  response.sendStatus(200);
});

// drops the table users if it already exists, populates new users table it with just the default users.
app.get("/reset", async (request, response) => {
  await setup();
  response.redirect("/");
});

// removes all entries from the users table
app.get("/clear", async (request, response) => {
  await User.destroy({where: {}});
  response.redirect("/");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});