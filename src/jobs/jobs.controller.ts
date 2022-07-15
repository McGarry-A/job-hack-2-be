// eslint-disable-next-line @typescript-eslint/no-var-requires
import axios from "axios"
import { Request, Response } from "express"
import { JobInterface, ReedJobInterface } from "./jobs.model"

const getReedJobs = async (req: Request, res: Response) => {
	try {
		// Need to make dynamic
		// const title = req.query["title"]
		// const location = req.query["location"]
		// const page = req.query["page"]

		// console.log(title, page, location)

		const options = {
			method: "GET",
			url: "https://www.reed.co.uk/api/1.0/search",
			//	params: {keywords: title, locationName: location, resultsToTake: 10, resultsToSKip: Number(page) * 10 },
			params: { keywords: "developer", locationName: "Manchester"},
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

		console.log(jobsArray)
		res
			.status(200)
			.send({message: "Success", jobs: jobsArray})

		

	} catch (error) {
		console.error(error)

		res
			.status(400)
			.send({message: "error"})
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

export { getReedJobs, getAdzunaJobs }