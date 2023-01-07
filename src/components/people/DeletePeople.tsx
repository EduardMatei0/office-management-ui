import {Box} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from "../ConfirmDialog";
import toast from "react-hot-toast";
import ApiClient from "../../services/ApiClient";
import {PeopleResponse} from "../../model/PeopleResponse";
import {COLORS} from "../../system/colors";
import {usePeopleContext} from "../../context/PeopleContext";
import {handleError} from "../../services/handleErrorService";

interface DeletePeopleProps {
    setPeople: Dispatch<SetStateAction<PeopleResponse[]>>,
    peopleToDelete: PeopleResponse
}

const deletePeople = (setPeopleList: Dispatch<SetStateAction<PeopleResponse[]>>,
                          peopleToDelete: PeopleResponse,
                          setConfirm: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();
    toast.promise(api.deletePeople(peopleToDelete), {
        loading: 'Deleting...',
        success: () => {
            setPeopleList((prevState:PeopleResponse[]) => {
                const newState = prevState.map(item => item);
                newState.splice(newState.indexOf(peopleToDelete), 1);
                return newState;
            });
            return 'People deleted successfully';
        },
        error: handleError
    });

    setConfirm(false);
}

const DeletePeople = (props: DeletePeopleProps) => {
    const {setPeople,peopleToDelete} = props;
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const allPeople = usePeopleContext();
    if (confirm) {
        deletePeople(setPeople,peopleToDelete, setConfirm);
        allPeople.splice(allPeople.indexOf(peopleToDelete), 1);
        console.log(allPeople);
    }
    return (
        <React.Fragment>
            <ConfirmDialog title={`Are you sure you want to delete ${peopleToDelete.name} ?`}
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

export default DeletePeople;
