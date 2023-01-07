import {AxiosError} from "axios";
import {ErrorResponse} from "../model/ErrorResponse";

export const handleError = (error:AxiosError<ErrorResponse>) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return "You don't have the role for this";
            case 403:
                window.location.href = "/login";
                localStorage.removeItem('user');
                return "Token expired or not logged in";
            default:
                return error.response.data.message;
        }
    }
    return 'An error has occured';
}
