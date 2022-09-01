import axios from "axios"
import { NextFunction, Request, Response } from "express"
import { JobInterface, ReedJobInterface } from "./jobs.model"
import sortAlpha from "./utils/sortAlpha"
import sortSalary from "./utils/sortSalary"

const getReedJobs = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const title = req.query["title"]
		const location = req.query["location"]
		const page = req.query["page"]
		const sort = req.query["sort"]

		const options = {
			method: "GET",
			url: "https://www.reed.co.uk/api/1.0/search",
			params: { keywords: title, locationName: location, resultsToTake: 10, resultsToSkip: Number(page) * 10 },
			headers: {
				cookie: "__cfruid=db44e3128c19837029ab9f8db916b74c36e8e95f-1657527229",
				Authorization: "Basic YjYwZGRmM2VkYzRjNDBmNWE4NjZiNmUzZDkxY2UyY2Q6"
			}
		}

		const response = await axios.request(options)
		const data = await response.data.results

		const jobsArray: JobInterface[] = data.map((el: Omit<ReedJobInterface, "contract">) => {
			return { 
				id: el.jobId, 
				title: el.jobTitle, 
				location: el.locationName, 
				description: el.jobDescription, 
				salary: el.maximumSalary, 
				company: el.employerName, 
				url: el.jobUrl, 
			}
		})

		if (!sort) {	
			return res
				.status(200)
				.send({message: "Success", jobs: jobsArray})
		}

		if (sort) {
			console.log("sending to sort")
			const dataToSort = { jobsArray, sort }
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			req.dataToSort = { ...dataToSort }
			next()
		}

	} catch (error) {
		console.error(error)

		res
			.status(400)
			.send({message: "error"})
	}
}

const getReedJob = async (req: Request, res: Response) => {
	console.log("Get reed job")
	try {
		const jobId = req.params.id
		console.log(jobId)
		const options = {
			method: "GET",
			url: `https://www.reed.co.uk/api/1.0/jobs/${jobId}`,
			headers: {
				cookie: ".ASPXANONYMOUS=B8oQanJRqQFJdTzZfBfg1l1IMu60z-qtuK13d_QcOnDGzKpBSQ3zWsXUmMJhqsnuIuGPoa6zCQN-86Xv7rKxYsfzk5-48NaUCRGcaxq3Vl4VlQaLQhNnTQTfz_I3cg6MQ-iOBw2; __cf_bm=Cix1RGiNak.7JsGfZTu3nYnWfDP3k09TAjNt6oN5f1A-1657906191-0-AS29qEn3CXkzBWwK40Cbls4Qv148xDmVGYKa7k5bqz%2B2COIkFfq3KivfFhtkDAO8N%2FAtSTr5VwONJfSIQaHabfw%3D; __cfruid=04ece7d581ff83ac86083e15867d8af238e9efad-1657404103",
				Authorization: "Basic YjYwZGRmM2UtZGM0Yy00MGY1LWE4NjYtYjZlM2Q5MWNlMmNkOg=="
			}
		}
		
		const response = await axios.request(options)
		const data = await response.data

		res
			.status(200)
			.send({message: "success", profile: data})
	} catch (error) {
		console.error(error)
		res
			.status(400)
			.send({message: "Error"})
	}
}

const getReedCompanyJobs = async (req: Request, res: Response) => {
	try {
		const employerId = req.params.id
		const page = req.query["page"]

		const options = {
			method: "GET",
			url: `https://www.reed.co.uk/api/1.0/search?employerId=${employerId}`,
			params:{ resultsToTake: 5 * Number(page) },
			headers: {
				cookie: ".ASPXANONYMOUS=B8oQanJRqQFJdTzZfBfg1l1IMu60z-qtuK13d_QcOnDGzKpBSQ3zWsXUmMJhqsnuIuGPoa6zCQN-86Xv7rKxYsfzk5-48NaUCRGcaxq3Vl4VlQaLQhNnTQTfz_I3cg6MQ-iOBw2; __cf_bm=Cix1RGiNak.7JsGfZTu3nYnWfDP3k09TAjNt6oN5f1A-1657906191-0-AS29qEn3CXkzBWwK40Cbls4Qv148xDmVGYKa7k5bqz%2B2COIkFfq3KivfFhtkDAO8N%2FAtSTr5VwONJfSIQaHabfw%3D; __cfruid=04ece7d581ff83ac86083e15867d8af238e9efad-1657404103",
				Authorization: "Basic YjYwZGRmM2UtZGM0Yy00MGY1LWE4NjYtYjZlM2Q5MWNlMmNkOg=="
			}
		}
		
		const response = await axios.request(options)
		const data = await response.data.results

		const companyJobsArray: JobInterface[] = data.map((el: Omit<ReedJobInterface, "contract">) => {
			return { 
				id: el.jobId, 
				title: el.jobTitle, 
				location: el.locationName, 
				description: el.jobDescription, 
				salary: el.maximumSalary, 
				company: el.employerName, 
				url: el.jobUrl, 
			}
		})

		res
			.status(200)
			.send({message: "Success", jobs: companyJobsArray})

	} catch (error) {
		console.error(error)
		res
			.status(400)
			.send({message: "Error"})
	}
}

const getAdzunaJobs = async (req: Request, res: Response) => {
	try {

		const page = 1
		const contract = 1
		const location = "Manchester"
		const title = "Developer"

		// something up with the URL recieving 400's think I've maxed out requests for today?
        
		const options = {
			method: "GET",
			headers: {
				"Content-Type":"application/json"
			},
			url: "https://api.adzuna.com/v1/api/jobs/gb/search/",
			params: {
				title: "developer", 
				location: "manchester", 
				page: page, 
				app_id: "14758e80", 
				app_key: "b7bdf1e68baa9af01ec4a64dbfe8d2b3"
			},
		}
        
		const response = await axios.request(options)
		const data = await response
		console.log(response.status)

		res
			.status(200)
			.send({message: "Success", jobs: data})

	} catch (error) {
		console.error(error)
	}
}

const handleSort = (req: Request, res: Response) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	console.log(req.dataToSort)
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { sort, jobsArray } = req.dataToSort
	let sortedJobs
	switch (sort) {
	case "sort_alpha":
		sortedJobs = sortAlpha(jobsArray)
		return res.status(200).send({ message: "success", jobs: sortedJobs })
	case "sort_ascending":
		sortedJobs = sortSalary("ascending", jobsArray)
		return res.status(200).send({ message: "success", jobs: sortedJobs })
	case "sort_decsending":
		sortedJobs = sortSalary("descending", jobsArray)
		return res.status(200).send({ message: "success", jobs: sortedJobs })
	default:
		return res.status(200).send({ message: "success", jobs: jobsArray})
	}
}

export { getReedJobs, getReedJob, getReedCompanyJobs, getAdzunaJobs, handleSort }