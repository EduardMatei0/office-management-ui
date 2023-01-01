import {
    Box,
    Fab,
} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {COLORS} from "../system/colors";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import {DepartmentResponse} from "../model/DepartmentResponse";
import AddOrEditCategoryDialog from "./AddOrEditCategoryDialog";

interface AddCategoryProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse
}

const AddCategory = (props: AddCategoryProps) => {
    const {setDepartments, currentDepartment} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditCategoryDialog
                currentDepartment={currentDepartment}
                setDepartments={setDepartments}
                open={open}
                setOpen={setOpen} />
            <Box sx={{display: 'flex', marginBottom: '15px', color: COLORS.GREEN}}>
                <Fab color="inherit" aria-label="add" onClick={() => setOpen(true)}>
                    <PersonAddRoundedIcon />
                </Fab>
            </Box>
        </React.Fragment>
    );
}

export default AddCategory;
