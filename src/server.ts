import "./db/connection"

import express, { Response, Express } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")

import userRouter from "./user/user.routes"

const app: Express = express()
const port = 5001
  

app
	.use(express.json())
	.use(cors())
	.use(userRouter)

app.get("/", (_, res: Response) => {
	res
		.status(200)
		.send({ message: "home route" })
})

app.listen(port, () => console.log(`Running on port ${port}`))
