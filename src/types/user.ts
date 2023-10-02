import { Task } from "./Tasks"

export interface User {
    email: string
    tasks: Task[]
}