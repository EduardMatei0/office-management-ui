import {PeopleResponse} from "../model/PeopleResponse";
import axios, {AxiosResponse} from "axios";
import {DepartmentResponse} from "../model/DepartmentResponse";
import {FilterForm} from "../model/FilterForm";
import {BASE_URL} from "../system/constants";


export default class ApiClient {

    async getAllPeople(): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.get(`${BASE_URL}/peoples`);
        return response.data;
    }

    async getAllPeopleByQuery(filterForm: FilterForm): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.post(`${BASE_URL}/peoples/search`, filterForm);
        return response.data;
    }

    async savePeople(personToAdd: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.post(`${BASE_URL}/peoples`, personToAdd);
        return response.data;
    }

    async editPeople(personToEdit: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.put(`${BASE_URL}/peoples/${personToEdit.id}`, personToEdit);
        return response.data;
    }

    async getAllDepartments(): Promise<DepartmentResponse[]> {
        const response: AxiosResponse<DepartmentResponse[]> = await axios.get(`${BASE_URL}/departments`);
        return response.data;
    }

    async saveDepartment(departmentToAdd: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.post(`${BASE_URL}/departments`, departmentToAdd);
        return response.data;
    }

    async editDepartment(departmentToEdit: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.put(`${BASE_URL}/departments/${departmentToEdit.id}`, departmentToEdit);
        return response.data;
    }

    async deleteDepartment(departmentToDelete: DepartmentResponse): Promise<String> {
        const response: AxiosResponse<String> = await axios.delete(`${BASE_URL}/departments/${departmentToDelete.id}`);
        return response.data;
    }

}

