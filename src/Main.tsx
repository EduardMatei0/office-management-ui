import React, {useState} from 'react';
import './Main.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NavBar from "./components/NavBar";
import PeoplePage from "./pages/PeoplePage";
import MainTitle from "./components/MainTitle";
import {CssBaseline} from "@mui/material";
import {Toaster} from "react-hot-toast";
import DepartmentPage from "./pages/DepartmentPage";
import usePeople from "./hooks/usePeople";
import {PeopleContext} from "./context/PeopleContext";
import useDepartments from "./hooks/useDepartments";
import {FilterForm} from "./model/FilterForm";
import usePeopleSearch from "./hooks/usePeopleSearch";



const Main = () => {
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
            <Toaster />
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
}

export default Main;
