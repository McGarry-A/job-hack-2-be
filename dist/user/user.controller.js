"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.deleteUser = exports.getUsers = exports.login = exports.addUser = void 0;
const connection_1 = __importDefault(require("../../src/db/connection"));
// THIS WORKS
// req.body = user: ROW_TYPE
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql_insert = "INSERT INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)";
        const newUser = req.body;
        const { first_name, last_name, email, password } = req.body;
        connection_1.default.run(sql_insert, [first_name, last_name, email, password], (err) => {
            if (err)
                return console.error(err);
            console.log("a new row has been created");
        });
        res
            .status(200)
            .send({ message: "Success", newUser });
    }
    catch (err) {
        console.error(err);
        res
            .status(400)
            .send({ message: "error at function on server" });
    }
});
exports.addUser = addUser;
// req.body = { email, password}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const sql_find = "SELECT * FROM users WHERE email = (?) AND password = (?)";
        connection_1.default.all(sql_find, [email, password], (err, rows) => {
            if (err)
                return console.error(err);
            const { first_name, last_name, email, liked, applied, interview, accepted, rejected } = rows[0];
            const state = {
                isLoggedIn: true,
                user: {
                    firstName: first_name,
                    lastName: last_name,
                    email: email
                },
                savedJobs: {
                    likedJobs: liked,
                    appliedJobs: applied,
                    interviewJobs: interview,
                    acceptedJobs: accepted,
                    rejectedJobs: rejected
                }
            };
            res
                .status(200)
                .send({ message: "Success", user: state });
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(400)
            .send({ message: "error at function on server" });
    }
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql_find_all = "SELECT * FROM users";
        let allUsers = [];
        connection_1.default.all(sql_find_all, [], (err, rows) => {
            if (err)
                return console.error(err);
            allUsers = rows;
        });
        res
            .status(200)
            .send({ message: "Success", allUsers: allUsers });
    }
    catch (err) {
        console.error(err);
        res
            .status(400)
            .send({ message: "error at function on server" });
    }
});
exports.getUsers = getUsers;
// THIS WORKS
// req.body = userId: number  
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdToDelete = Number(req.params.id);
        const sql_to_delete = "DELETE FROM users WHERE id=(?)";
        connection_1.default.run(sql_to_delete, userIdToDelete, (err) => {
            if (err)
                return console.error(err);
            console.log("Successfully deleted");
        });
        res
            .status(200)
            .send({ message: "Sucessfully delete", id: userIdToDelete });
    }
    catch (err) {
        console.error(err);
        res
            .status(400)
            .send({ message: "error at function on server" });
    }
});
exports.deleteUser = deleteUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { newUser: { firstName, lastName, email, password } } = req.body;
        const { user: { email: originalEmail } } = req.body;
        const sql_update_statement = "UPDATE users SET first_name = (?), last_name = (?), email = (?), password = (?) WHERE email = (?)";
        connection_1.default.run(sql_update_statement, [firstName, lastName, email, password, originalEmail], (err, rows) => {
            if (err)
                return console.error(err);
            console.log(rows);
            res
                .status(200)
                .send({ user: req.body.newUser, message: "Successfully updated user." });
        });
        console.log("edit user");
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send({ message: "unable to update user at the server" });
    }
});
exports.editUser = editUser;
//# sourceMappingURL=user.controller.js.map