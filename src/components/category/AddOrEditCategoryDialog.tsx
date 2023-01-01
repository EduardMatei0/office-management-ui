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
import {CategoryResponse} from "../../model/CategoryResponse";
import {usePeopleContext} from "../../context/PeopleContext";
import {ErrorResponse} from "../../model/ErrorResponse";

interface AddOrEditCategoryDialogProps {
    setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
    currentDepartment: DepartmentResponse,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    editCategory?: CategoryResponse,
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

const isValidForm = (category: CategoryResponse) => {
    return category.name.length > 0;
}


const addOrEditCategory = (category: CategoryResponse,
                   department: DepartmentResponse,
                   setCategory: Dispatch<SetStateAction<CategoryResponse>>,
                   setDepartments: Dispatch<SetStateAction<DepartmentResponse[]>>,
                   setOpen: Dispatch<SetStateAction<boolean>>) => {
    const api = new ApiClient();
    if (category.id) {
        department.categories[department.categories.findIndex(c => c.id === category.id)] = category;
    } else {
        department.categories.push(category);
    }
    toast.promise(api.editDepartment(department), {
        loading: 'Saving...',
        success: result => {
            setDepartments((prevState:DepartmentResponse[]) => {
                const newState = prevState.map(item => item);
                const selectedIndex = newState.findIndex(department => department.name === result.name);
                newState[selectedIndex] = result;
                setCategory(!category.id ? createDefaultCategory() : category);
                setOpen(false);
                return newState;
            });
            return 'Category added successfully';
        },
        error: (error:AxiosError<ErrorResponse>) => {
            console.log(error.response);
            if (error.response?.status === 409) return error.response.data.exceptionMessage;
            return 'An error has occured';
        }
    });
}

const createDefaultCategory = (): CategoryResponse => {
    return {
        name: "",
        peopleList: [],
        peopleIds: []
    };
};

const AddOrEditCategoryDialog = (props: AddOrEditCategoryDialogProps) => {
    const {setDepartments, currentDepartment, open, setOpen, editCategory, edit} = props;
    const people = usePeopleContext();
    const [clicked, setClicked] = useState(false);
    const [categoryToUpdate, setCategoryToUpdate] = useState<CategoryResponse>(edit && editCategory ? editCategory : createDefaultCategory());
    const categoryPeople = people
        .filter(people => categoryToUpdate.peopleIds.includes(people.id));
    return (<Dialog open={open}>
        <Box sx={{minWidth: '500px'}}>
            <DialogTitle sx={{textAlign: 'center'}}>{edit ? 'Update' : 'Add New'} Category</DialogTitle>
            <Box sx={{
                width: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': { m: 1}}} component="form">
                <TextField
                    id="name"
                    label="Name"
                    error={clicked && categoryToUpdate.name.length < 1}
                    variant="outlined"
                    defaultValue={categoryToUpdate.name}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle sx={{color: COLORS.GREEN}}/>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setCategoryToUpdate({
                        ...categoryToUpdate,
                        name: e.target.value
                    })
                    }/>
                {people.length > 0 && (<ReactSelect
                    key={`unique_key_peoples`}
                    options={convertToArrayOptions(people)}
                    isMulti
                    value={convertToArrayOptions(categoryPeople)}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{Option}}
                    onChange={(items) => setCategoryToUpdate({
                        ...categoryToUpdate,
                        peopleIds: items ? items.map(i => i.value.id) : []
                    })}
                    placeholder={'Add People'}
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
                            if (isValidForm(categoryToUpdate)) {
                                addOrEditCategory(categoryToUpdate, currentDepartment, setCategoryToUpdate,setDepartments, setOpen);
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

export default AddOrEditCategoryDialog;
