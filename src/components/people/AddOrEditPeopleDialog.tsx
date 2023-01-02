import {Box, Button, Dialog, DialogTitle, InputAdornment, TextField} from "@mui/material";
import {AccountCircle, ArrowBack, Email, Save, Smartphone} from "@mui/icons-material";
import {COLORS} from "../../system/colors";
import toast from "react-hot-toast";
import * as React from "react";
import useDepartments from "../../hooks/useDepartments";
import {Dispatch, SetStateAction, useState} from "react";
import {PeopleResponse} from "../../model/PeopleResponse";
import {components, CSSObjectWithLabel, default as ReactSelect} from "react-select";
import ApiClient from "../../services/ApiClient";
import {AxiosError} from "axios";

interface AddOrEditPeopleDialogProps {
    setPeople: Dispatch<SetStateAction<PeopleResponse[]>>,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    editPerson?: PeopleResponse,
    edit?: boolean,
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

const convertToArrayOptions = (array: string[]) => {
    return array.map(a => ({value: a, label: a.toString()}));
};

const reactSelectStyles = (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    width: '100%',
    maxWidth: '450px',
    padding: '10px 0',
    borderColor: COLORS.GREEN,
})

const isValidEmail = (email:string) => {
    return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
}

const isValidPhoneNumber = (phoneNumber:string) => {
    return phoneNumber.match(/^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
}

const isValidForm = (person: PeopleResponse) => {
    return person.name.length > 0 && isValidEmail(person.email) && isValidPhoneNumber(person.phoneNumber);
}


const addPerson = (person: PeopleResponse,
                   setPerson: Dispatch<SetStateAction<PeopleResponse>>,
                   setPeople: Dispatch<SetStateAction<PeopleResponse[]>>,
                   setOpen: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();
    toast.promise(api.savePeople(person), {
        loading: 'Saving...',
        success: result => {
            setPeople((prevState:PeopleResponse[]) => {
                const newState = prevState.map(item => item);
                newState.push(result);
                setPerson(createDefaultPerson());
                setOpen(false);
                return newState;
            });
            return 'People added succesfully';
        },
        error: (error:AxiosError) => {
            if (error.response?.status === 409) return `User with ${person.email} already exists.`;
            return 'An error has occured';
        }
    });
}

const updatePerson = (person: PeopleResponse,
                      setPeople: Dispatch<SetStateAction<PeopleResponse[]>>,
                      setOpen: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();
    toast.promise(api.editPeople(person), {
        loading: 'Updating...',
        success: result => {
            setPeople((prevState:PeopleResponse[]) => {
                const newState = prevState.map(item => item.id === result.id ? {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    phoneNumber: result.phoneNumber,
                    departments: result.departments,
                    categories: result.categories
                } : item);
                setOpen(false);
                return newState;
            });
            return 'People updated succesfully';
        },
        error: (error:AxiosError) => {
            if (error.response?.status === 409) return `User with ${person.email} already exists.`;
            return 'An error has occured';
        }
    });
}

const createDefaultPerson = (): PeopleResponse => {
    return {
        id: 0,
        categories: [],
        departments: [],
        email: "",
        name: "",
        phoneNumber: ""
    };
};

const AddOrEditPeopleDialog = (props: AddOrEditPeopleDialogProps) => {
    const {setPeople, open, setOpen, editPerson, edit} = props;
    const [departments] = useDepartments();
    const [clicked, setClicked] = useState(false);
    const [personToUpdate, setPersonToUpdate] = useState<PeopleResponse>(edit && editPerson ? editPerson : createDefaultPerson());
    const ministries = departments
        .filter(department => personToUpdate.departments.includes(department.name))
        .map(department => department.categories).flat(1)
        .map(categoryResponse => categoryResponse.name);
    return (<Dialog open={open}>
        <Box sx={{minWidth: '500px'}}>
            <DialogTitle sx={{textAlign: 'center'}}>{edit ? 'Update' : 'Add New'} Person</DialogTitle>
            <Box sx={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1}}} component="form">
                <TextField
                    id="fullName"
                    label="Full Name"
                    error={clicked && personToUpdate.name.length < 1}
                    variant="outlined"
                    defaultValue={personToUpdate.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle sx={{color: COLORS.GREEN}}/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setPersonToUpdate({
                        ...personToUpdate,
                        name: e.target.value
                    })
                    }/>
                <TextField id="email"
                           label="Email"
                           error={clicked && !isValidEmail(personToUpdate.email)}
                           variant="outlined"
                           defaultValue={personToUpdate.email}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Email sx={{color: COLORS.GREEN}}/>
                                   </InputAdornment>
                               ),
                           }}
                           onChange={(e) => setPersonToUpdate({
                               ...personToUpdate,
                               email: e.target.value
                           })}/>
                <TextField id="phone"
                           label="Phone Number"
                           defaultValue={personToUpdate.phoneNumber}
                           error={clicked && !isValidPhoneNumber(personToUpdate.phoneNumber)}
                           variant="outlined"
                           color="primary"
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <Smartphone sx={{color: COLORS.GREEN}}/>
                                   </InputAdornment>
                               ),
                           }}
                           onChange={(e) => setPersonToUpdate({
                               ...personToUpdate,
                               phoneNumber: e.target.value
                           })}/>
                <ReactSelect
                    key={`unique_key_departments`}
                    options={convertToArrayOptions(departments.map(department => department.name))}
                    isMulti
                    value={convertToArrayOptions(personToUpdate.departments)}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{Option}}
                    onChange={(items) => setPersonToUpdate({
                        ...personToUpdate,
                        departments: items.map(i => i.value)
                    })}
                    placeholder={'Add Teams'}
                    styles={{
                        control: reactSelectStyles,
                    }}
                />
                {ministries.length > 0 && (<ReactSelect
                    key={`unique_key_categories`}
                    options={convertToArrayOptions(ministries)}
                    isMulti
                    value={convertToArrayOptions(personToUpdate.categories)}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{Option}}
                    onChange={(items) => setPersonToUpdate({
                        ...personToUpdate,
                        categories: items.map(i => i.value)
                    })}
                    placeholder={'Add Ministries'}
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
                            if (isValidForm(personToUpdate)) {
                                edit && editPerson ?
                                    updatePerson(personToUpdate, setPeople, setOpen) :
                                    addPerson(personToUpdate, setPersonToUpdate, setPeople, setOpen);
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

export default AddOrEditPeopleDialog;
