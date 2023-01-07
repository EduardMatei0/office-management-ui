import {Box, ThemeProvider} from "@mui/material";
import {theme} from "../system/colors";
import * as React from "react";
import DepartmentNavBar from "../components/department/DepartmentNavBar";
import {Dispatch, SetStateAction, useState} from "react";
import DepartmentTable from "../components/department/DepartmentTable";
import AddCategory from "../components/category/AddCategory";
import {DepartmentResponse} from "../model/DepartmentResponse";

interface DepartmentPageProps {
    departments: DepartmentResponse[],
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>
}

const DepartmentPage = (props: DepartmentPageProps) => {
    const {departments, setDepartments} = props;
    const [value, setValue] = useState(0);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{margin: '0 auto'}}>
                <DepartmentNavBar
                    value={value}
                    setValue={setValue}
                    setDepartments={setDepartments}
                    currentDepartment={departments[value]}
                    departmentNames={departments.map(department => department.name)} />
                {departments[value] && (
                    <React.Fragment>
                        <Box sx={{padding: '2rem'}}>
                            <AddCategory setDepartments={setDepartments} currentDepartment={departments[value]}/>
                            <DepartmentTable department={departments[value]} setDepartments={setDepartments} />
                        </Box>
                    </React.Fragment>)}
            </Box>
        </ThemeProvider>
    );
}

export default DepartmentPage;
