import { JobInterface } from "../jobs.model"

const sortAlpha = (array: JobInterface[]) => {
	console.log("sorting alphabetically")
	const sortedArray = array.sort((a, b) => {
		return a.title.localeCompare(b.title)
	})

	return sortedArray
}

export default sortAlpha