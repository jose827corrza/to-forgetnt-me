import { FieldValue, Timestamp } from "firebase/firestore"

export interface Post{
    id?: string
    userId: string
    topics: string[]
    name: string
    body: string
    createdAt?: Timestamp | FieldValue
    comments: Comment[]
}

export interface Comment {
    id?: string
    userId: string
    text: string
    createdAt?: Timestamp | FieldValue
    postId: string
}
