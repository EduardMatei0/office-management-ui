import React, {useState} from "react";
import {FilterForm} from "../model/FilterForm";
import usePeopleSearch from "../hooks/usePeopleSearch";
import usePeople from "../hooks/usePeople";
import useDepartments from "../hooks/useDepartments";
import {PeopleContext} from "../context/PeopleContext";
import {CssBaseline} from "@mui/material";
import MainTitle from "../components/MainTitle";
import NavBar from "../components/NavBar";
import PeoplePage from "./PeoplePage";
import DepartmentPage from "./DepartmentPage";


const HomePage = () => {
    const [value, setValue] = useState('1');
    const [applyFilter, setApplyFilter] = useState<boolean>( false);
    const [filterForm, setFilterForm] = useState<FilterForm>({
        names: [],
        emails: [],
        phoneNumbers: [],
        departments: [],
        categories: []
    });
    const [peopleList, setPeopleList] = usePeopleSearch(applyFilter, filterForm);
    const [allPeople] = usePeople();
    const [departments, setDepartments] = useDepartments();
    return (
        <div className="App">
            <PeopleContext.Provider value={allPeople}>
                <CssBaseline />
                <header >
                    <MainTitle />
                    <NavBar value={value} setValue={setValue} />
                    {value === "1" && (<PeoplePage
                        peopleList={peopleList}
                        setPeopleList={setPeopleList}
                        departments={departments}
                        applyFilter={applyFilter}
                        setApplyFilter={setApplyFilter}
                        filterForm={filterForm}
                        setFilterForm={setFilterForm}
                    />)}
                    {value === "2" && (<DepartmentPage departments={departments} setDepartments={setDepartments}/>)}
                </header>
            </PeopleContext.Provider>
        </div>
    );
};

export default HomePage;
