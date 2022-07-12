import { NextFunction, Request, Response } from "express"
import db from "../db/connection"
import bcrypt from "bcrypt"

const comparePasswords = (req: Request, res: Response, next: NextFunction) => {
	try {
		const find_user_sql = "SELECT password FROM users WHERE email = (?)"
		// db.all(find_user_sql, [req.body.email], async (err:any, rows:any) => {
		// 	if (err) console.error(err)
		// 	const comparisonBool = await bcrypt.compare(req.body.pass, rows.pass)

		// 	if (comparisonBool) {
		// 		req.user = user
		// 		next()
		// 	} else {
		// 		res.status(401).send({message: "Incorrect login details"})
		// 	}
		// })
		next()
	} catch (error) {
		console.log(error)
		res
			.status(500)
			.send({ message: "Check server logs. Error while comparing passwords." })
	}
}

export default comparePasswords