


import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import MultipleDataCell from "./MultipleDataCell";
import {styled, TablePagination} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {COLORS} from "../system/colors";
import {DepartmentResponse} from "../model/DepartmentResponse";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        color: COLORS.LIGHT_GREEN
    },
}));

interface DepartmentTableProps {
    department: DepartmentResponse
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>
}

const deleteCategory = (test: string) => {
    console.log(test);
}

const DepartmentTable = (props: DepartmentTableProps) => {
    const {department, setDepartments} = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Leader</TableCell>
                            <TableCell>People</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {department.categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category) => (
                                <StyledTableRow key={category.name}>
                                    <TableCell >{category.name}</TableCell>
                                    <TableCell >No leader</TableCell>
                                    <TableCell >
                                        {category.peopleList.length !== 0 ? <MultipleDataCell list={category.peopleList.map(people => people.name)} /> : 'None'}
                                    </TableCell>
                                    <TableCell>
                                        <EditCategory setDepartments={setDepartments}
                                                      currentDepartment={department}
                                                      categoryToEdit={category} />
                                    </TableCell>
                                    <TableCell>
                                        <DeleteCategory setDepartments={setDepartments}
                                                        currentDepartment={department}
                                                        categoryToDelete={category}/>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={department.categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}

export default DepartmentTable;
