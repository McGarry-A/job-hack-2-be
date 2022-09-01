import { JobInterface } from "../jobs.model"

const sortSalary = (sortBy: "ascending" | "descending", jobsArray: JobInterface[]) => {
	console.log("sorting by salary")
	const sortedArray = jobsArray.sort((a, b) => {
		if (a.salary > b.salary) return -1
		if (a.salary < b.salary) return 1
		return 0
	})

	return sortedArray
}

export default sortSalary