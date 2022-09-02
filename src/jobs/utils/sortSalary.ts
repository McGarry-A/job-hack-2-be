import { JobInterface } from "../jobs.model"

const sortSalary = (sortBy: "sort_ascending" | "sort_decsending", jobsArray: JobInterface[]) => {
	console.log("sorting by salary")

	if (sortBy === "sort_ascending") {
		return jobsArray.sort((a, b) => {
			if (a.salary > b.salary) return -1
			if (a.salary < b.salary) return 1
			return 0
		})
	}
    
	if (sortBy === "sort_decsending") {
		console.log("sort decsending")
		return jobsArray.sort((a, b) => {
			if (a.salary > b.salary) return 1
			if (a.salary < b.salary) return -1
			return 0
		})
	}

	return jobsArray
}

export default sortSalary