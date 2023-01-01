import React from 'react';
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



const Main = () => {
    const [value, setValue] = React.useState('1');
    const [peopleList, setPeopleList] = usePeople();
  return (
    <div className="App">
        <PeopleContext.Provider value={peopleList}>
            <CssBaseline />
            <Toaster />
            <header >
                <MainTitle />
                <NavBar value={value} setValue={setValue} />
                {value === "1" && (<PeoplePage peopleList={peopleList} setPeopleList={setPeopleList}/>)}
                {value === "2" && (<DepartmentPage />)}
            </header>
        </PeopleContext.Provider>
    </div>
  );
}

export default Main;
