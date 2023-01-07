import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import MultipleDataCell from "../MultipleDataCell";
import {styled, TablePagination} from "@mui/material";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {COLORS} from "../../system/colors";
import {PeopleResponse} from "../../model/PeopleResponse";
import EditPeople from "./EditPeople";
import {hasAdminRole, hasStaffRole} from "../../services/authService";
import DeletePeople from "./DeletePeople";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td': {
        color: COLORS.LIGHT_GREEN
    },
}));

interface PeopleTableProps {
    peopleList: PeopleResponse[]
    setPeopleList: Dispatch<SetStateAction<PeopleResponse[]>>
}

const PeopleTable = (props: PeopleTableProps) => {
    const {peopleList, setPeopleList} = props;
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
                            <TableCell>Full Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Phone Number</TableCell>
                            <TableCell >Departments</TableCell>
                            <TableCell >Sub-Departments</TableCell>
                            {hasStaffRole() && (<TableCell >Edit</TableCell>)}
                            {hasAdminRole() && (<TableCell >Delete</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {peopleList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((people) => (
                                <StyledTableRow key={people.email}>
                                    <TableCell >{people.name}</TableCell>
                                    <TableCell >{people.email}</TableCell>
                                    <TableCell >{people.phoneNumber}</TableCell>
                                    <TableCell >
                                        {people.departments.length !== 0 ? <MultipleDataCell list={people.departments} /> : 'None'}
                                    </TableCell>
                                    <TableCell >
                                        {people.categories.length !== 0 ? <MultipleDataCell list={people.categories} /> : 'None'}
                                    </TableCell>
                                    {hasStaffRole() && (
                                        <TableCell>
                                            <EditPeople setPeople={setPeopleList} peopleToEdit={people}/>
                                        </TableCell>
                                    )}
                                    {hasAdminRole() && (
                                        <TableCell>
                                            <DeletePeople setPeople={setPeopleList} peopleToDelete={people}/>
                                        </TableCell>
                                    )}
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={peopleList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}

export default PeopleTable;
