// INTERFACES AND TYPES 
type ROW_TYPE = {
    id: number,
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    liked: Array<JobType>,
    applied: Array<JobType>  
    interview: Array<JobType>  
    rejected: Array<JobType>  
    accepted: Array<JobType>  
}

type USER_TABLE_TYPE = ROW_TYPE[]

export { ROW_TYPE, USER_TABLE_TYPE }

export type JobType = {
    title: string;
    company: string;
    salary: number;
    location: string;
    description: string;
}

export interface UserStateInterface {
    isLoggedIn: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    }
    savedJobs: {
        likedJobs: JobType[]
        appliedJobs: JobType[]
        interviewJobs: JobType[]
        acceptedJobs: JobType[]
        rejectedJobs: JobType[]
    }
}