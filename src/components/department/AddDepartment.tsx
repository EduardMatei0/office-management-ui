import { Tab} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AddOrEditDepartmentDialog from "./AddOrEditDepartmentDialog";

interface AddDepartmentProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>
}

const AddDepartment = (props: AddDepartmentProps) => {
    const {setDepartments} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditDepartmentDialog
                setDepartments={setDepartments}
                open={open}
                setOpen={setOpen} />
            <Tab
                value={0}
                icon={<AddHomeIcon />}
                iconPosition="end"
                label="New"
                onClick={() => setOpen(true)}/>
        </React.Fragment>
    );
}

export default AddDepartment;
