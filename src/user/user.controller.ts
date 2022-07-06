// ALL USER METHODS LOGIN SIGN UP GET USERS UPDATE USER ETC
import { Request, Response } from "express"
import db from "../../src/db/connection"
import { ROW_TYPE, USER_TABLE_TYPE } from "./user.model"


// THIS WORKS
// req.body = user: ROW_TYPE
const addUser = async (req: Request, res: Response) => {
	try {
		const sql_insert = "INSERT INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)"
		const newUser: Pick<ROW_TYPE, "first_name" | "last_name" | "email" | "password"> = req.body 
		const { first_name, last_name, email, password } = newUser

		db.run(sql_insert,[first_name, last_name, email, password], (err: any) => {
			if (err) return console.error(err)
			console.log("a new row has been created")
		})

		res
			.status(200)
			.send({message: "Success", newUser})
	} catch (err) {
		console.error(err)
		res
			.status(400)
			.send({message: "error at function on server"})
	}
}

// req.body = { email, password}
const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const sql_find_all = "SELECT * FROM users"
		let user: ROW_TYPE = null
        
		db.all(sql_find_all, [], (err: any, rows: Array<ROW_TYPE>) => {
			if (err) return console.error(err)
			rows.forEach((row: ROW_TYPE) => {
				if (email === row.email && password === row.password) {
					user = row
				}
			})
		})

		res
			.status(200)
			.send({message: "Succeess", user})

	} catch (err) {
		console.error(err)
		res
			.status(400)
			.send({message: "error at function on server"})
	}
}

// THIS DOESN'T WORK
// req.body = {} 
const getUsers = async (req: Request, res: Response) => {
	try {
		const sql_find_all = "SELECT * FROM users"
		const users: ROW_TYPE[] = []
		const allUsers = db.all(sql_find_all, [], (err: any, rows: USER_TABLE_TYPE) => {
			if (err) return console.error(err)
			rows.forEach((row) => {
				users.push(row)
			})
		})
        
		res
			.status(200)
			.send({message:"Success", users: users})
        
	} catch (err) {
		console.error(err)
		res
			.status(400)
			.send({message: "error at function on server"})
	}
}

// THIS WORKS
// req.body = userId: number  
const deleteUser = async (req: Request, res: Response) => {
	try {
		const userIdToDelete = Number(req.params.id)
		const sql_to_delete = "DELETE FROM users WHERE id=(?)"

		db.run(sql_to_delete, userIdToDelete, (err: any) => {
			if (err) return console.error(err)
			console.log("Successfully deleted")
		})

		res
			.status(200)
			.send({message: "Sucessfully delete", id: userIdToDelete})

	} catch (err) {
		console.error(err)
		res
			.status(400)
			.send({message: "error at function on server"})
	}
}

export { addUser, login, getUsers, deleteUser }