import {Box, Button, Dialog, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {AccountCircle, ArrowBack,Save} from "@mui/icons-material";
import {COLORS} from "../../system/colors";
import toast from "react-hot-toast";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {PeopleResponse} from "../../model/PeopleResponse";
import {components, CSSObjectWithLabel, default as ReactSelect} from "react-select";
import ApiClient from "../../services/ApiClient";
import {AxiosError} from "axios";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import {usePeopleContext} from "../../context/PeopleContext";
import {ErrorResponse} from "../../model/ErrorResponse";

interface AddOrEditDepartmentDialogProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    editDepartment?: DepartmentResponse,
    edit?: boolean
}

const Option = (props: any) => {
    return (
        <div>
            <components.Option {...props}>
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const convertToArrayOptions = (array: PeopleResponse[]) => {
    return array.map(a => ({value: a, label: a.name}));
};

const reactSelectStyles = (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    width: '100%',
    maxWidth: '450px',
    padding: '10px 0',
    borderColor: COLORS.GREEN,
})

const isValidForm = (department: DepartmentResponse) => {
    return department.name.length > 0;
}


const addDepartmentApi = (department: DepartmentResponse,
                             setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                             setOpen: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();

    toast.promise(api.saveDepartment(department), {
        loading: 'Saving...',
        success: result => {
            setDepartments((prevState:DepartmentResponse[]) => {
                setOpen(false);
                return [...prevState, result];
            });
            return 'Department added successfully';
        },
        error: (error:AxiosError<ErrorResponse>) => {
            console.log(error.response);
            if (error.response) return error.response.data.exceptionMessage;
            return 'An error has occured';
        }
    });
}

const editDepartmentApi = (department: DepartmentResponse,
                        setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                        setDepartmentToUpdate: Dispatch<SetStateAction<DepartmentResponse>>,
                        setOpen: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();

    toast.promise(api.editDepartment(department), {
        loading: 'Updating...',
        success: result => {
            setDepartments((prevState:DepartmentResponse[]) => {
                const newState = prevState.map(item => item);
                const selectedIndex = newState.findIndex(department => department.id === result.id);
                newState[selectedIndex] = result;
                setOpen(false);
                setDepartmentToUpdate(result);
                return newState;
            });
            return 'Department updated successfully';
        },
        error: (error:AxiosError<ErrorResponse>) => {
            console.log(error.response);
            if (error.response) return error.response.data.exceptionMessage;
            return 'An error has occured';
        }
    });
}

const createDefaultDepartment = (): DepartmentResponse => {
    return {
        name: "",
        leaders: [],
        leadersIds: [],
        categories: []
    };
};

const AddOrEditDepartmentDialog = (props: AddOrEditDepartmentDialogProps) => {
    const {setDepartments,open, setOpen, editDepartment, edit} = props;
    const people = usePeopleContext();
    const [clicked, setClicked] = useState(false);
    const [departmentToUpdate, setDepartmentToUpdate] = useState<DepartmentResponse>(edit && editDepartment ? editDepartment : createDefaultDepartment());
    if (editDepartment && editDepartment.id !== departmentToUpdate.id) setDepartmentToUpdate(editDepartment);
    const leaderPeople = people
        .filter(people => departmentToUpdate.leadersIds.includes(people.id));
    return (<Dialog open={open}>
        <Box sx={{minWidth: '500px'}}>
            <DialogTitle sx={{textAlign: 'center'}}>{edit ? 'Update' : 'Add New'} Department</DialogTitle>
            <Box sx={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1}}} component="form">
                <TextField
                    id="name"
                    label="Name"
                    error={clicked && departmentToUpdate.name.length < 1}
                    variant="outlined"
                    defaultValue={departmentToUpdate.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle sx={{color: COLORS.GREEN}}/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setDepartmentToUpdate({
                        ...departmentToUpdate,
                        name: e.target.value
                    })
                    }/>
                {people.length > 0 && (<ReactSelect
                    key={`unique_key_peoples`}
                    options={convertToArrayOptions(people)}
                    isMulti
                    value={convertToArrayOptions(leaderPeople)}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{Option}}
                    onChange={(items) => setDepartmentToUpdate({
                        ...departmentToUpdate,
                        leadersIds: items ? items.map(i => i.value.id) : []
                    })}
                    placeholder={'Add Leaders'}
                    styles={{
                        control: reactSelectStyles,
                    }}
                />)}
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        sx={{mr: '10px'}}
                        onClick={() => setOpen(false)}
                    >
                        Go Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setClicked(true);
                            if (isValidForm(departmentToUpdate)) {
                                edit ?
                                    editDepartmentApi(
                                        departmentToUpdate,
                                        setDepartments,
                                        setDepartmentToUpdate,
                                        setOpen) :
                                    addDepartmentApi(
                                        departmentToUpdate,
                                        setDepartments,
                                        setOpen)
                                setClicked(false);
                            } else {
                                toast.error('Please fix errors', {duration: 3000});
                            }
                        }}
                        endIcon={<Save />}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    </Dialog>);
}

export default AddOrEditDepartmentDialog;
