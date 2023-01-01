import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ApiClient from "../services/ApiClient";
import {DepartmentResponse} from "../model/DepartmentResponse";


const useDepartments = (): [DepartmentResponse[], Dispatch<SetStateAction<DepartmentResponse[]>>] => {
    const api = new ApiClient();
    const [department, setDepartment] = useState<DepartmentResponse[]>([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const list = await api.getAllDepartments();
            setDepartment(list);
        };
        fetchDepartments();
    }, []);

    return [department, setDepartment];
}

export default useDepartments;
