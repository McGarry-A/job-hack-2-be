import { Router } from "express"
import { getAdzunaJobs, getReedJob, getReedJobs } from "./jobs.controller"

const jobsRouter = Router()

jobsRouter.get("/reed", getReedJobs)
jobsRouter.get("/adzuna", getAdzunaJobs)
jobsRouter.get("/user/:id", getReedJob)

export default jobsRouter