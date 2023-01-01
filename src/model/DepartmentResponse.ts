import {CategoryResponse} from "./CategoryResponse";

export interface DepartmentResponse {
    id?: number,
    name: string,
    categories: CategoryResponse[]
}
