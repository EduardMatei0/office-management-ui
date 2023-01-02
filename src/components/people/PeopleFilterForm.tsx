import {Dispatch, SetStateAction, useState} from "react";
import {PeopleResponse} from "../../model/PeopleResponse";
import * as React from "react";
import {Box, Fab} from "@mui/material";
import {COLORS} from "../../system/colors";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleFilterFormDialog from "./PeopleFilterFormDialog";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import {FilterForm} from "../../model/FilterForm";

interface PeopleFilterFormProps {
    peoples: PeopleResponse[],
    setPeoples: Dispatch<SetStateAction<PeopleResponse[]>>,
    departments: DepartmentResponse[],
    applyFilter: boolean,
    setApplyFilter: Dispatch<SetStateAction<boolean>>,
    filterForm: FilterForm,
    setFilterForm: Dispatch<SetStateAction<FilterForm>>
}

const PeopleFilterForm = (props: PeopleFilterFormProps) => {
    const {peoples,
        setPeoples,
        departments,
    applyFilter,
    setApplyFilter,
    filterForm,
    setFilterForm} = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <PeopleFilterFormDialog
                peoples={peoples}
                setPeoples={setPeoples}
                departments={departments}
                open={open}
                setOpen={setOpen}
                applyFilter={applyFilter}
                setApplyFilter={setApplyFilter}
                filterForm={filterForm}
                setFilterForm={setFilterForm}
            />
            <Box sx={{display: 'flex', marginBottom: '15px', color: COLORS.GREEN}}>
                <Fab color="inherit" aria-label="add" onClick={() => setOpen(true)}>
                    <PersonSearchIcon />
                </Fab>
            </Box>
        </React.Fragment>
    );
}

export default PeopleFilterForm;
