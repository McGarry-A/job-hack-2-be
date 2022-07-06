import express from "express"
import cors from "cors"
import "./db/connection"

const app = express()
const port = 3000

app.use(cors)
	.use(express.json())

app.get("/", (req, res) => {
	res.status(200).send({message: "home route"})
})

app.listen(port, () => console.log(`Running on port ${port}`))
