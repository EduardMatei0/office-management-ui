import * as React from 'react';
import {Box, ThemeProvider} from "@mui/material";
import PeopleTable from "../components/people/PeopleTable";
import AddPeople from "../components/people/AddPeople";
import {theme} from "../system/colors";
import {PeopleResponse} from "../model/PeopleResponse";
import {Dispatch, SetStateAction} from "react";

interface PeopleProps {
    peopleList: PeopleResponse[],
    setPeopleList: Dispatch<SetStateAction<PeopleResponse[]>>
}

const PeoplePage = (props: PeopleProps) => {
    const {peopleList, setPeopleList} = props;
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: '0 auto', padding: '2rem'}}>
                <AddPeople setPeople={setPeopleList}/>
                <PeopleTable peopleList={peopleList} setPeopleList={setPeopleList}/>
            </Box>
        </ThemeProvider>
    );
}

export default PeoplePage;
