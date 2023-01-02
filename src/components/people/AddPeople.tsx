import {
    Box,
    Fab,
} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {PeopleResponse} from "../../model/PeopleResponse";
import {COLORS} from "../../system/colors";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import AddOrEditPeopleDialog from "./AddOrEditPeopleDialog";

interface AddPeopleProps {
    setPeople: Dispatch<SetStateAction<PeopleResponse[]>>
}

const AddPeople = (props: AddPeopleProps) => {
    const {setPeople} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <AddOrEditPeopleDialog setPeople={setPeople} open={open} setOpen={setOpen} />
            <Box sx={{display: 'flex', marginBottom: '15px', marginRight: '10px', color: COLORS.GREEN}}>
                <Fab color="inherit" aria-label="add" onClick={() => setOpen(true)}>
                    <PersonAddRoundedIcon />
                </Fab>
            </Box>
        </React.Fragment>
    );
}

export default AddPeople;
