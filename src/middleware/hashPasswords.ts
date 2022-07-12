import { NextFunction, Request, Response } from "express"

import bcrypt from "bcrypt"

const hashPassword = async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 8)
		next()
	} catch(error) {
		console.log(error)
		res.status(500).send({message: "error hashing password"})
	}
}

export default hashPassword