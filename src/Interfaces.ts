export interface ITask {
    name : string,
    deadline : number,
    completed : boolean

}

export interface IUser {
    name : string,
    username : string,
    email : string,
    phone : string,
    city : string,
    tasks?: ITask[],
    archive?: ITask[],
    

}