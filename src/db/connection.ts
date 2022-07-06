// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require("sqlite3").verbose()
import { ROW_TYPE } from "../../src/user/user.model"

// CONNECT TO THE DATABASE
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err: any) => {
	if (err) return console.error(err)

	console.log("Connection successful")
})

// DELETE A TABLE
// const sql_drop_table = "DROP TABLE users"
// db.run(sql_drop_table, (err: any) => {
// 	console.error(err)
// })

// CREATE A TABLE IF THERE ISN'T ALREADY ONE
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY NOT NULL, first_name, last_name, email UNIQUE, password)", (err: any) => {
	return console.error(err)
})

// INSERT INTO TABLE
const sql_insert = "INSERT INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)"

db.run(sql_insert,["Ahmed", "McGarry", "ahmed@gmail.com", "password123"], (err: any) => {
	if (err) return console.error(err)
	console.log("a new row has been created")
})

// FIND AND LOG ITEMS IN THE TABLE
const sql_find_all = "SELECT * FROM users"

db.all(sql_find_all, [], (err: any, rows: Array<ROW_TYPE>) => {
	if (err) return console.error(err)
	rows.forEach((row: ROW_TYPE) => {
		console.log(row)
	})
})

export default db