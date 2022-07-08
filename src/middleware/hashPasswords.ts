import { NextFunction, Request, Response } from "express"

import bcrypt from "bcrypt"

const hashPassword = (req: Request, res: Response, next: NextFunction) => {
	try {
		next()
	} catch(error) {
		console.log(error)
	}
}

export default hashPassword