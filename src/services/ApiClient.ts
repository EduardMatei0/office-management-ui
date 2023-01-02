import {PeopleResponse} from "../model/PeopleResponse";
import axios, {AxiosResponse} from "axios";
import {DepartmentResponse} from "../model/DepartmentResponse";
import {FilterForm} from "../model/FilterForm";


export default class ApiClient {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = `http://localhost:8080/api`;
    }

    async getAllPeople(): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.get(`${this.baseURL}/peoples`);
        return response.data;
    }

    async getAllPeopleByQuery(filterForm: FilterForm): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.post(`${this.baseURL}/peoples/search`, filterForm);
        return response.data;
    }

    async savePeople(personToAdd: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.post(`${this.baseURL}/peoples`, personToAdd);
        return response.data;
    }

    async editPeople(personToEdit: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.put(`${this.baseURL}/peoples/${personToEdit.id}`, personToEdit);
        return response.data;
    }

    async getAllDepartments(): Promise<DepartmentResponse[]> {
        const response: AxiosResponse<DepartmentResponse[]> = await axios.get(`${this.baseURL}/departments`);
        return response.data;
    }

    async saveDepartment(departmentToAdd: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.post(`${this.baseURL}/departments`, departmentToAdd);
        return response.data;
    }

    async editDepartment(departmentToEdit: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.put(`${this.baseURL}/departments/${departmentToEdit.id}`, departmentToEdit);
        return response.data;
    }

    async deleteDepartment(departmentToDelete: DepartmentResponse): Promise<String> {
        const response: AxiosResponse<String> = await axios.delete(`${this.baseURL}/departments/${departmentToDelete.id}`);
        return response.data;
    }

}

