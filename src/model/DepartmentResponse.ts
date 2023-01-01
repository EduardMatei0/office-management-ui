import {CategoryResponse} from "./CategoryResponse";
import {PeopleResponse} from "./PeopleResponse";

export interface DepartmentResponse {
    id?: number,
    name: string,
    leaders: PeopleResponse[],
    leadersIds: number[],
    categories: CategoryResponse[]
}
