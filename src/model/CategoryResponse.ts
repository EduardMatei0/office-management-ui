import {PeopleResponse} from "./PeopleResponse";

export interface CategoryResponse {
    id?: number,
    name: string,
    peopleList: PeopleResponse[],
    peopleIds: number[]
}
