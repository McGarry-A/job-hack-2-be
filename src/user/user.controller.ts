// ALL USER METHODS LOGIN SIGN UP GET USERS UPDATE USER ETC
import { Request, Response } from "express"
import db from "../../src/db/connection"
import { ROW_TYPE, UserStateInterface, USER_TABLE_TYPE } from "./user.model"


// THIS WORKS
// req.body = user: ROW_TYPE
const addUser = async (req: Request, res: Response) => {
	try {
		const sql_insert = "INSERT INTO users(first_name, last_name, email, password) VALUES(?,?,?,?)"
		const newUser: Pick<ROW_TYPE, "first_name" | "last_name" | "email" | "password"> = req.body
		const { first_name, last_name, email, password } =  req.body 

		db.run(sql_insert,[first_name, last_name, email, password], (err: any) => {
			if (err) return console.error(err)
			console.log("a new row has been created")
		})

		res
			.status(200)
			.send({ message: "Success", newUser })
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
			const {first_name, last_name, email, liked, applied, interview, accepted, rejected} = rows[0]

			
			const state: UserStateInterface = {
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

export { addUser, login, getUsers, deleteUser }