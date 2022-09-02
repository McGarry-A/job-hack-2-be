// eslint-disable-next-line @typescript-eslint/no-var-requires
const sqlite3 = require("sqlite3").verbose()

// CONNECT TO THE DATABASE
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err: any) => {
	if (err) return console.error(err)

	console.log("Connection successful")
})

db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY NOT NULL, first_name NOT NULL, last_name NOT NULL, email NOT NULL UNIQUE, password NOT NULL, saved_jobs)", (err: any) => {
	if (err) return console.error(err)
	console.log("Table created or already exists")
})

export default db