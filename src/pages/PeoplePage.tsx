import * as React from 'react';
import {Box, ThemeProvider} from "@mui/material";
import PeopleTable from "../components/people/PeopleTable";
import AddPeople from "../components/people/AddPeople";
import {theme} from "../system/colors";
import {PeopleResponse} from "../model/PeopleResponse";
import {Dispatch, SetStateAction} from "react";
import {DepartmentResponse} from "../model/DepartmentResponse";
import PeopleFilterForm from "../components/people/PeopleFilterForm";
import {FilterForm} from "../model/FilterForm";
import {hasStaffRole} from "../services/authService";

interface PeopleProps {
    peopleList: PeopleResponse[],
    setPeopleList: Dispatch<SetStateAction<PeopleResponse[]>>,
    departments: DepartmentResponse[],
    applyFilter: boolean,
    setApplyFilter: Dispatch<SetStateAction<boolean>>,
    filterForm: FilterForm,
    setFilterForm: Dispatch<SetStateAction<FilterForm>>
}

const PeoplePage = (props: PeopleProps) => {
    const {peopleList,
        setPeopleList,
        departments,
    applyFilter,
    setApplyFilter,
    filterForm,
    setFilterForm} = props;
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: '0 auto', padding: '2rem'}}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    {hasStaffRole() && (<AddPeople setPeople={setPeopleList}/>)}
                    <PeopleFilterForm
                        setPeoples={setPeopleList}
                        peoples={peopleList}
                        departments={departments}
                        applyFilter={applyFilter}
                        setApplyFilter={setApplyFilter}
                        filterForm={filterForm}
                        setFilterForm={setFilterForm}
                    />
                </Box>
                <PeopleTable peopleList={peopleList} setPeopleList={setPeopleList}/>
            </Box>
        </ThemeProvider>
    );
}

export default PeoplePage;
