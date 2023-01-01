import {
    Box,
} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {PeopleResponse} from "../model/PeopleResponse";
import EditIcon from '@mui/icons-material/Edit';
import AddOrEditPeopleDialog from "./AddOrEditPeopleDialog";
import {COLORS} from "../system/colors";

interface EditPeopleProps {
    setPeople: Dispatch<SetStateAction<PeopleResponse[]>>,
    peopleToEdit: PeopleResponse
}

const EditPeople = (props: EditPeopleProps) => {
    const {setPeople, peopleToEdit} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditPeopleDialog
                setPeople={setPeople}
                open={open}
                setOpen={setOpen}
                editPerson={peopleToEdit}
                edit
            />
            <Box sx={{cursor: 'pointer', color: COLORS.GREEN}} onClick={() => setOpen(true)}>
                <EditIcon />
            </Box>
        </React.Fragment>
    );
}

export default EditPeople;
