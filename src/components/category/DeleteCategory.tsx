import {Box,} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {COLORS} from "../../system/colors";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import {CategoryResponse} from "../../model/CategoryResponse";
import ConfirmDialog from "../ConfirmDialog";
import toast from "react-hot-toast";
import {AxiosError} from "axios";
import {ErrorResponse} from "../../model/ErrorResponse";
import ApiClient from "../../services/ApiClient";

interface DeleteCategoryProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse,
    categoryToDelete: CategoryResponse
}

const deleteCategory = (categoryToDelete: CategoryResponse,
                        setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                        currentDepartment: DepartmentResponse,
                        setConfirm: Dispatch<SetStateAction<boolean>>) => {
    currentDepartment.categories
        .splice(currentDepartment.categories.indexOf(categoryToDelete), 1);
    const api = new ApiClient();
    toast.promise(api.editDepartment(currentDepartment), {
        loading: 'Saving...',
        success: result => {
            setDepartments((prevState:DepartmentResponse[]) => {
                const newState = prevState.map(item => item);
                const selectedIndex = newState.findIndex(department => department.name === result.name);
                newState[selectedIndex] = result;
                return newState;
            });
            return 'Category deleted successfully';
        },
        error: (error:AxiosError<ErrorResponse>) => {
            console.log(error.response);
            if (error.response?.status === 409) return error.response.data.exceptionMessage;
            return 'An error has occured';
        }
    });

    setConfirm(false);
}

const DeleteCategory = (props: DeleteCategoryProps) => {
    const {setDepartments,currentDepartment, categoryToDelete} = props;
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    if (confirm) deleteCategory(categoryToDelete, setDepartments, currentDepartment, setConfirm);
    return (
        <React.Fragment>
            <ConfirmDialog title={`Are you sure you want to delete ${categoryToDelete.name} ?`}
                           confirm={confirm}
                           open={open}
                           setOpen={setOpen}
                           setConfirm={setConfirm} />
            <Box sx={{cursor: 'pointer', color: COLORS.RED}} onClick={() => setOpen(true)}>
                <DeleteIcon />
            </Box>
        </React.Fragment>
    );
}

export default DeleteCategory;
