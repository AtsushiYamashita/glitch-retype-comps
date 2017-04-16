import * as express from 'express'
import { Sequelize } from 'sequelize'
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
  users.forEach(user => {
    User.create({ firstName: user[0], lastName: user[1]}); // create a new entry in the users table
  })
}

;(async () => {
  try {
    await sequelize.authenticate()
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

app.use(express.static('public'));

app.get("/users", async (request, response) => {
  const users = await User.findAll().map(user => [user.firstName, user.lastName])
  response.send(users);
});

// creates a new entry in the users table with the submitted values
app.post("/users", async (request, response) => {
  // destructuring: http://es6-features.org/#ObjectMatchingShorthandNotation
  const {firstName, lastName} = request.query
  // property shorthand: http://es6-features.org/#PropertyShorthand
  await User.create({firstName, lastName});
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