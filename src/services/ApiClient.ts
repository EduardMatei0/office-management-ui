import {PeopleResponse} from "../model/PeopleResponse";
import axios, {AxiosResponse} from "axios";
import {DepartmentResponse} from "../model/DepartmentResponse";


export default class ApiClient {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = `http://localhost:8080/api`;
    }

    async getAllPeople(): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.get(`${this.baseURL}/people`);
        return response.data;
    }

    async savePeople(personToAdd: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.post(`${this.baseURL}/people`, personToAdd);
        return response.data;
    }

    async editPeople(personToEdit: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.put(`${this.baseURL}/people/${personToEdit.id}`, personToEdit);
        return response.data;
    }

    async getAllDepartments(): Promise<DepartmentResponse[]> {
        const response: AxiosResponse<DepartmentResponse[]> = await axios.get(`${this.baseURL}/department`);
        return response.data;
    }

    async saveDepartment(departmentToAdd: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.post(`${this.baseURL}/department`, departmentToAdd);
        return response.data;
    }

    async editDepartment(departmentToEdit: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.put(`${this.baseURL}/department/${departmentToEdit.id}`, departmentToEdit);
        return response.data;
    }

    async deleteDepartment(departmentToDelete: DepartmentResponse): Promise<String> {
        const response: AxiosResponse<String> = await axios.delete(`${this.baseURL}/department/${departmentToDelete.id}`);
        return response.data;
    }

}

