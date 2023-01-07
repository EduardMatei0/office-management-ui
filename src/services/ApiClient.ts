import {PeopleResponse} from "../model/PeopleResponse";
import axios, {AxiosResponse} from "axios";
import {DepartmentResponse} from "../model/DepartmentResponse";
import {FilterForm} from "../model/FilterForm";
import {BASE_URL} from "../system/constants";
import {getCurrentUser} from "./authService";

const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { Authorization: `${user.type} ${user.token}`};
    }
    return {};
}

export default class ApiClient {

    async getAllPeople(): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.get(`${BASE_URL}/peoples`, {headers: authHeader()});
        return response.data;
    }

    async getAllPeopleByQuery(filterForm: FilterForm): Promise<PeopleResponse[]> {
        const response: AxiosResponse<PeopleResponse[]> = await axios.post(`${BASE_URL}/peoples/search`, filterForm, {headers: authHeader()});
        return response.data;
    }

    async savePeople(personToAdd: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.post(`${BASE_URL}/peoples`, personToAdd, {headers: authHeader()});
        return response.data;
    }

    async editPeople(personToEdit: PeopleResponse): Promise<PeopleResponse> {
        const response:AxiosResponse<PeopleResponse> = await axios.put(`${BASE_URL}/peoples/${personToEdit.id}`, personToEdit, {headers: authHeader()});
        return response.data;
    }

    async deletePeople(peopleToDelete: PeopleResponse): Promise<String> {
        const response: AxiosResponse<String> = await axios.delete(`${BASE_URL}/peoples/${peopleToDelete.id}`, {headers: authHeader()});
        return response.data;
    }

    async getAllDepartments(): Promise<DepartmentResponse[]> {
        const response: AxiosResponse<DepartmentResponse[]> = await axios.get(`${BASE_URL}/departments`, {headers: authHeader()});
        return response.data;
    }

    async saveDepartment(departmentToAdd: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.post(`${BASE_URL}/departments`, departmentToAdd, {headers: authHeader()});
        return response.data;
    }

    async editDepartment(departmentToEdit: DepartmentResponse): Promise<DepartmentResponse> {
        const response: AxiosResponse<DepartmentResponse> = await axios.put(`${BASE_URL}/departments/${departmentToEdit.id}`, departmentToEdit, {headers: authHeader()});
        return response.data;
    }

    async deleteDepartment(departmentToDelete: DepartmentResponse): Promise<String> {
        const response: AxiosResponse<String> = await axios.delete(`${BASE_URL}/departments/${departmentToDelete.id}`, {headers: authHeader()});
        return response.data;
    }

}

