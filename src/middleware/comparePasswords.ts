import { NextFunction, Request, Response } from "express"

const comparePasswords = (req: Request, res: Response, next: NextFunction) => {
	try {
		next()
	} catch (error) {
		console.log(error)
	}
}

export default comparePasswords