import { IArticle } from "./IArticle"
import { IPosition } from "./IPosition"

export interface IBooking {
    id?: number
    position: IPosition
    exhibitor_id: number
    articles: IArticle[]
    created_at?: Date
    updated_at?: Date
}