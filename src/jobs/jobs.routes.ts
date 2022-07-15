import { Router } from "express"
import { getAdzunaJobs, getReedJob, getReedJobs } from "./jobs.controller"

const jobsRouter = Router()

jobsRouter.get("/reed", getReedJobs)
jobsRouter.get("/adzuna", getAdzunaJobs)
jobsRouter.get("/reed/:id", getReedJob)

export default jobsRouter