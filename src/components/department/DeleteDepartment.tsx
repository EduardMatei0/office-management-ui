import {Tab,} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {DepartmentResponse} from "../../model/DepartmentResponse";
import ConfirmDialog from "../ConfirmDialog";
import toast from "react-hot-toast";
import ApiClient from "../../services/ApiClient";
import {handleError} from "../../services/handleErrorService";

interface DeleteDepartmentProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse
}

const deleteDepartment = (setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                        currentDepartment: DepartmentResponse,
                        setConfirm: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();
    toast.promise(api.deleteDepartment(currentDepartment), {
        loading: 'Deleting...',
        success: () => {
            setDepartments((prevState:DepartmentResponse[]) => {
                const newState = prevState.map(item => item);
                newState.splice(newState.indexOf(currentDepartment), 1);
                return newState;
            });
            return 'Department deleted successfully';
        },
        error: handleError
    });

    setConfirm(false);
}

const DeleteDepartment = (props: DeleteDepartmentProps) => {
    const {setDepartments,currentDepartment} = props;
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    if (confirm) deleteDepartment(setDepartments, currentDepartment, setConfirm);
    return (
        <React.Fragment>
            <ConfirmDialog title={`Are you sure you want to delete ${currentDepartment.name} ?`}
                           confirm={confirm}
                           open={open}
                           setOpen={setOpen}
                           setConfirm={setConfirm} />
            <Tab
                value={2}
                icon={<DeleteIcon />}
                iconPosition="end"
                label="Delete"
                onClick={() => setOpen(true)}/>
        </React.Fragment>
    );
}

export default DeleteDepartment;
