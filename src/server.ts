import "./db/connection"

import express, { Response, Express } from "express"
import userRouter from "./user/user.routes"
// import cors from "cors"

const app: Express = express()
const port = 5000

app
	.use(express.json())
	.use(userRouter)
	// .use(cors)

app.get("/", (_, res: Response) => {
	res
		.status(200)
		.send({ message: "home route" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
