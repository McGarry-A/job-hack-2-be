// INTERFACES AND TYPES 
type ROW_TYPE = {
    id: number,
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    saved_jobs: savedJobsInterface
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
    savedJobs: savedJobsInterface
}

interface savedJobsInterface {
    columnOrder: string[],
        jobs: {
            [key: string]: {
                id: string;
                title: string;
                company: string;
                link: string
            }
        },
        columns: {
            [key: string]: {
                id: string,
                title: string,
                jobIds: string[]
            }
        }
}