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
const sequelize = new sequelize_1.Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
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
        users.forEach(user => {
            User.create({ firstName: user[0], lastName: user[1] });
        });
    });
}
;
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        User = sequelize.define('users', {
            firstName: {
                type: sequelize_1.Sequelize.STRING
            },
            lastName: {
                type: sequelize_1.Sequelize.STRING
            }
        });
        yield setup();
    }
    catch (err) {
        console.log('Unable to connect to the database: ', err);
    }
}))();
app.use(express.static('public'));
app.get("/users", (request, response) => __awaiter(this, void 0, void 0, function* () {
    const users = yield User.findAll().map(user => [user.firstName, user.lastName]);
    response.send(users);
}));
app.post("/users", (request, response) => __awaiter(this, void 0, void 0, function* () {
    const { firstName, lastName } = request.query;
    yield User.create({ firstName, lastName });
    response.sendStatus(200);
}));
app.get("/reset", (request, response) => __awaiter(this, void 0, void 0, function* () {
    yield setup();
    response.redirect("/");
}));
app.get("/clear", (request, response) => __awaiter(this, void 0, void 0, function* () {
    yield User.destroy({ where: {} });
    response.redirect("/");
}));
var listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
