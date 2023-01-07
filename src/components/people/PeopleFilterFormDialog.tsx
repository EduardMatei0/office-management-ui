import {components, CSSObjectWithLabel, default as ReactSelect} from "react-select";
import * as React from "react";
import {COLORS} from "../../system/colors";
import {Box, Button, Dialog, DialogTitle} from "@mui/material";
import {PeopleResponse} from "../../model/PeopleResponse";
import {Dispatch, SetStateAction} from "react";
import {DepartmentResponse} from "../../model/DepartmentResponse";
import {ArrowBack, PersonSearch} from "@mui/icons-material";
import {FilterForm} from "../../model/FilterForm";
import {usePeopleContext} from "../../context/PeopleContext";

interface PeopleFilterFormProps {
    peoples: PeopleResponse[],
    setPeoples: Dispatch<SetStateAction<PeopleResponse[]>>,
    departments: DepartmentResponse[],
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    applyFilter: boolean,
    setApplyFilter: Dispatch<SetStateAction<boolean>>,
    filterForm: FilterForm,
    setFilterForm: Dispatch<SetStateAction<FilterForm>>
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


const PeopleFilterFormDialog = (props: PeopleFilterFormProps) => {
    const {
        departments,
        open,
        setOpen,
        applyFilter,
        setApplyFilter,
        filterForm,
        setFilterForm
    } = props;
    const peoples = usePeopleContext();
    // @ts-ignore
    const categoriesOptions = [...new Set(peoples.flatMap(people => people.categories))];
    return (
        <Dialog open={open}>
            <Box sx={{minWidth: '500px'}}>
                <DialogTitle sx={{textAlign: 'center'}}>Search by fields</DialogTitle>
                <Box sx={{
                    width: '100%',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    '& > :not(style)': { m: 1}}} component="form">
                    <ReactSelect
                        key={`unique_key_names`}
                        options={convertToArrayOptions(peoples.map(people => people.name))}
                        isMulti
                        value={convertToArrayOptions(filterForm.names)}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{Option}}
                        onChange={(items) => setFilterForm({
                            ...filterForm,
                            names: items.map(i => i.value)
                        })}
                        placeholder={'Search by name'}
                        styles={{
                            control: reactSelectStyles,
                        }}
                    />
                    <ReactSelect
                        key={`unique_key_emails`}
                        options={convertToArrayOptions(peoples.map(people => people.email))}
                        isMulti
                        value={convertToArrayOptions(filterForm.emails)}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{Option}}
                        onChange={(items) => setFilterForm({
                            ...filterForm,
                            emails: items.map(i => i.value)
                        })}
                        placeholder={'Search by email'}
                        styles={{
                            control: reactSelectStyles,
                        }}
                    />
                    <ReactSelect
                        key={`unique_key_phoneNumbers`}
                        options={convertToArrayOptions(peoples.map(people => people.phoneNumber))}
                        isMulti
                        value={convertToArrayOptions(filterForm.phoneNumbers)}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{Option}}
                        onChange={(items) => setFilterForm({
                            ...filterForm,
                            phoneNumbers: items.map(i => i.value)
                        })}
                        placeholder={'Search by phone number'}
                        styles={{
                            control: reactSelectStyles,
                        }}
                    />
                    <ReactSelect
                        key={`unique_key_departments`}
                        options={convertToArrayOptions(departments.map(department => department.name))}
                        isMulti
                        value={convertToArrayOptions(filterForm.departments)}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{Option}}
                        onChange={(items) => setFilterForm({
                            ...filterForm,
                            departments: items.map(i => i.value)
                        })}
                        placeholder={'Search by departments'}
                        styles={{
                            control: reactSelectStyles,
                        }}
                    />
                    <ReactSelect
                        key={`unique_key_categories`}
                        options={convertToArrayOptions(categoriesOptions)}
                        isMulti
                        value={convertToArrayOptions(filterForm.categories)}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{Option}}
                        onChange={(items) => setFilterForm({
                            ...filterForm,
                            categories: items.map(i => i.value)
                        })}
                        placeholder={'Search by categories'}
                        styles={{
                            control: reactSelectStyles,
                        }}
                    />
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '3rem'}}>
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
                            setOpen(false);
                            setApplyFilter(!applyFilter);
                        }}
                        endIcon={<PersonSearch />}>
                        Search
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
};

export default PeopleFilterFormDialog;
