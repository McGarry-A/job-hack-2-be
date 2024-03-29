import { Router } from "express"
import { getAdzunaJobs, getReedCompanyJobs, getReedJob, getReedJobs, handleSort } from "./jobs.controller"

const jobsRouter = Router()

jobsRouter.get("/api/reed", getReedJobs, handleSort)
jobsRouter.get("/api/adzuna", getAdzunaJobs)
jobsRouter.get("/api/reed/:id", getReedJob)
jobsRouter.get("/api/reed/company/:id", getReedCompanyJobs)

export default jobsRouter