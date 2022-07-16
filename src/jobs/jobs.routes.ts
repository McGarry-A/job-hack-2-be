import { Router } from "express"
import { getAdzunaJobs, getReedJob, getReedJobs } from "./jobs.controller"

const jobsRouter = Router()

jobsRouter.get("api/reed", getReedJobs)
jobsRouter.get("api/adzuna", getAdzunaJobs)
jobsRouter.get("api/reed/:id", getReedJob)

export default jobsRouter