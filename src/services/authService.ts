import {MessageResponse} from "../model/MessageResponse";
import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../system/constants";
import {JwtResponse} from "../model/JwtResponse";


export const registerUser = async (username: string,
                   email: string,
                   password: string) : Promise<MessageResponse> => {
    const response: AxiosResponse<MessageResponse> = await axios.post(`${BASE_URL}/signup`, {
        username,
        email,
        password
    });
    return response.data;
};

export const loginUser = async (email: string, password: string) : Promise<JwtResponse> => {
    const response: AxiosResponse<JwtResponse> = await axios.post(`${BASE_URL}/signin`, {
        email,
        password
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const getCurrentUser = (): JwtResponse | null => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) return JSON.parse(userFromStorage);
    return null;
};

export const hasStaffRole = (): boolean => {
    const user = getCurrentUser();
    if (!user) return false;
    return user && (user.roles.includes('ROLE_STAFF') || user.roles.includes('ROLE_ADMIN'));
}

export const hasAdminRole = (): boolean => {
    const user = getCurrentUser();
    if (!user) return false;
    return user && (user.roles.includes('ROLE_ADMIN'));
}



