export interface ITask {
    id?: number
    title: string
    description: string
    sort_order?: number
    user_id: number
    created_at?: Date
    updated_at?: Date
}