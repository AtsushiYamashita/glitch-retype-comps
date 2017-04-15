"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sequelize_1 = require("sequelize");
const app = express();
const users = [
    ["John", "Hancock"],
    ["Liz", "Smith"],
    ["Ahmed", "Khan"]
];
let User;
const sequelize = new sequelize_1.default('database', process.env.DB_USER, process.env.DB_PASS, {
    host: '0.0.0.0',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: '.data/database.sqlite'
});
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        yield User.sync({ force: true });
        for (var i = 0; i < users.length; i++) {
            User.create({ firstName: users[i][0], lastName: users[i][1] });
        }
    });
}
;
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection has been established successfully.');
        User = sequelize.define('users', {
            firstName: {
                type: sequelize_1.default.STRING
            },
            lastName: {
                type: sequelize_1.default.STRING
            }
        });
        yield setup();
    }
    catch (err) {
        console.log('Unable to connect to the database: ', err);
    }
}))();
app.use(express.static('public'));
app.get("/", (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});
app.get("/users", (request, response) => {
    var dbUsers = [];
    User.findAll().then((users) => {
        users.forEach(function (user) {
            dbUsers.push([user.firstName, user.lastName]);
        });
        response.send(dbUsers);
    });
});
app.post("/users", function (request, response) {
    User.create({ firstName: request.query.fName, lastName: request.query.lName });
    response.sendStatus(200);
});
app.get("/reset", function (request, response) {
    setup();
    response.redirect("/");
});
app.get("/clear", function (request, response) {
    User.destroy({ where: {} });
    response.redirect("/");
});
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
