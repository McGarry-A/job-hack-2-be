import { Router } from "express"
import { getAdzunaJobs, getReedJobs } from "./jobs.controller"

const jobsRouter = Router()

jobsRouter.get("/reed", getReedJobs)
jobsRouter.get("/adzuna", getAdzunaJobs)

export default jobsRouter