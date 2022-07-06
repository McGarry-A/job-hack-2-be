// INTERFACES AND TYPES 
type ROW_TYPE = {
    id: number,
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string 
}

type USER_TABLE_TYPE = ROW_TYPE[]

export { ROW_TYPE, USER_TABLE_TYPE }