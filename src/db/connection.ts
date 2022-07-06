// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require("sqlite3").verbose()
import { ROW_TYPE } from "../../src/user/user.model"

// CONNECT TO THE DATABASE
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err: any) => {
	if (err) return console.error(err)

	console.log("Connection successful")
})


// CREATE A TABLE IF THERE ISN'T ALREADY ONE
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY NOT NULL, first_name, last_name, email UNIQUE, password)", (err: any) => {
	if (err) return console.error(err)
	console.log("Table created or already exists")
})

export default db