// ALL USER METHODS LOGIN SIGN UP GET USERS UPDATE USER ETC
import db from "../db/connection"
import { Request, Response } from "express"
import { ROW_TYPE, UserStateInterface, USER_TABLE_TYPE } from "./user.model"


// THIS WORKS
// req.body = user: ROW_TYPE
const addUser = async (req: Request, res: Response) => {
	try {
		const sql_insert = "INSERT INTO users(first_name, last_name, email, password, saved_jobs) VALUES(?,?,?,?,?)"
		const { first_name, last_name, email, password } =  req.body
		
		const savedJobs = {
			columnOrder: ["column-0"],
			jobs: {
				"job-0": {
					id: "job-0",
					title: "Drag me!",
					company: "JobHack2",
					link: "www.google.com"
				}
			},
			columns: {
				"column-0": {
					id: "column-0",
					title: "Saved Jobs",
					jobIds: ["job-0"]
				}
			}
		} 

		db.run(sql_insert,[first_name, last_name, email, password, JSON.stringify(savedJobs)], (err: any) => {
			if (err) return console.error(err)
			console.log("a new row has been created")
		})

		
		res
			.status(200)
			.send({ message: "Success" })

		// next?
		
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
		console.log(email, password)
		const sql_find = "SELECT * FROM users WHERE email = (?) AND password = (?)"
        
		db.all(sql_find, [email, password], (err: any, rows: Array<ROW_TYPE>) => {
			if (err) return console.error(err)
			console.log(JSON.stringify(rows))
			if (!rows.length) return console.error("No users found")
			const {first_name, last_name, email, saved_jobs } = rows[0]

			
			const state: UserStateInterface = {
				isLoggedIn: true,
				user: {
					firstName: first_name,
					lastName: last_name,
					email: email
				},
				savedJobs: saved_jobs
			}

			res
				.status(200)
				.send({message: "Success", user: state})
		})
	} catch (err) {
		console.error(err)
		res
			.status(400)
			.send({message: "error at function on server"})
	}
}

const getUsers = async (req: Request, res: Response) => {
	try {
		const sql_find_all = "SELECT * FROM users"
		let allUsers: USER_TABLE_TYPE = []
        
		db.all(sql_find_all, [], (err: any, rows: USER_TABLE_TYPE) => {
			if (err) return console.error(err)
			allUsers = rows
			
		})
        
		res
			.status(200)
			.send({ message:"Success", allUsers: allUsers })
        
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

const editUser = async (req: Request, res: Response) => {
	try {
		const {newUser: { firstName, lastName, email, password }} = req.body 
		const {user: { email: originalEmail }} = req.body

		const sql_update_statement = 
			"UPDATE users SET first_name = (?), last_name = (?), email = (?), password = (?) WHERE email = (?)"

		db.run(sql_update_statement, [firstName, lastName, email, password, originalEmail], (err: any, rows: ROW_TYPE) => {
			if (err) return console.error(err)

			console.log(rows)
			res
				.status(200)
				.send({ user: req.body.newUser, message: "Successfully updated user." })
		})

		console.log("edit user")

	} catch (error) {
		console.error(error)
		res
			.status(400)
			.send({message: "unable to update user at the server"})
	}
}

export { addUser, login, getUsers, deleteUser, editUser }