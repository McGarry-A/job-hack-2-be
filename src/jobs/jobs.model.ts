
// FOR FRONTEND 
export interface JobInterface {
  title: string;
  location: string;
  description: string;
  salary: number;
  company: string;
  contract: string;
  url: string;
  id: number;
}

// ADZUNA 
export interface AdzunaResponseInterface {
    __CLASS__: string;
    results: AdzunaJobInterface[]
}      
export interface AdzunaJobInterface {
        salary_min: number;
        location: {
          __CLASS__: string;
          area: string[];
          display_name: string;
        };
        salary_is_predicted: number;
        description: string;
        __CLASS__: string;
        created: string;
        redirect_url: string;
        contract_time: string;
        title: string;
        category: {
          __CLASS__: string;
          label: string;
          tag: string;
        };
        id: string;
        salary_max: number;
        company: {
          __CLASS__: string;
          display_name: string;
        };
        contract_type: string;
      }      

// FOR REED
export interface ReedResponseInterface {
    results: [];
    ambiguousLocations: [];
    totalResults: number;
}

export interface ReedJobInterface {
    jobId: number;
    employerId: number;
    employerName: string;
    employerProfileId: number | null,
    employerProfileName: string | null,
    jobTitle: string,
    locationName: string,
    minimumSalary: number,
    maximumSalary: number,
    currency: string,
    expirationDate: string,
    date: string,
    jobDescription: string,
    applications: number,
    jobUrl: string
}