import {
    Box,
} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {COLORS} from "../system/colors";
import {DepartmentResponse} from "../model/DepartmentResponse";
import {CategoryResponse} from "../model/CategoryResponse";
import AddOrEditCategoryDialog from "./AddOrEditCategoryDialog";

interface EditCategoryProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse,
    categoryToEdit: CategoryResponse
}

const EditCategory = (props: EditCategoryProps) => {
    const {setDepartments,currentDepartment, categoryToEdit} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditCategoryDialog setDepartments={setDepartments}
                                     currentDepartment={currentDepartment}
                                     open={open}
                                     setOpen={setOpen}
                                     editCategory={categoryToEdit}
                                     edit />
            <Box sx={{cursor: 'pointer', color: COLORS.GREEN}} onClick={() => setOpen(true)}>
                <EditIcon />
            </Box>
        </React.Fragment>
    );
}

export default EditCategory;
