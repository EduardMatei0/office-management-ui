import {
    Box,
} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {COLORS} from "../system/colors";
import {DepartmentResponse} from "../model/DepartmentResponse";
import {CategoryResponse} from "../model/CategoryResponse";
import ConfirmDialog from "./ConfirmDialog";

interface DeleteCategoryProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse,
    categoryToDelete: CategoryResponse
}

const deleteCategory = (categoryToDelete: CategoryResponse,
                        setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                        currentDepartment: DepartmentResponse,
                        setConfirm: Dispatch<SetStateAction<boolean>>) => {
    console.log(`Need to delete ${categoryToDelete.name}`);
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
