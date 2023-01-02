import { Tab} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import EditIcon from '@mui/icons-material/Edit';
import AddOrEditDepartmentDialog from "./AddOrEditDepartmentDialog";

interface EditDepartmentProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse
}

const EditDepartment = (props: EditDepartmentProps) => {
    const {setDepartments, currentDepartment} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditDepartmentDialog
                setDepartments={setDepartments}
                open={open}
                setOpen={setOpen}
                edit
                editDepartment={currentDepartment}
            />
            <Tab
                value={1}
                icon={<EditIcon />}
                iconPosition="end"
                label="Edit"
                onClick={() => setOpen(true)}/>
        </React.Fragment>
    );
}

export default EditDepartment;
