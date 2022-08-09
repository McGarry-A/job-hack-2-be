import "./db/connection"

import express, { Response, Express } from "express"
import cors from "cors"

import userRouter from "./user/user.routes"
import jobsRouter from "./jobs/jobs.routes"

const app: Express = express()
const port = process.env.PORT || 5001

app
	.use(express.json())
	.use(cors({
		origin: "http://localhost:3000"
	}))
	.use(userRouter)
	.use(jobsRouter)

app.get("/", (_, res: Response) => {
	res
		.status(200)
		.send({ message: "home route" })
})

app.get("/api", (_, res: Response) => {
	res
		.status(200)
		.send({ message: "Success" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
