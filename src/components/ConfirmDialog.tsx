import {Box, Button, Dialog, DialogTitle} from "@mui/material";
import {ArrowBack,Delete} from "@mui/icons-material";
import * as React from "react";
import {Dispatch, SetStateAction} from "react";

interface ConfirmDialogProps {
    title: string,
    confirm: boolean,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setConfirm: Dispatch<SetStateAction<boolean>>
}


const ConfirmDialog = (props: ConfirmDialogProps) => {
    const {title, confirm,open, setOpen, setConfirm} = props;
    return (<Dialog open={open}>
        <Box sx={{minWidth: '500px', padding: '2rem'}}>
            <DialogTitle sx={{textAlign: 'center'}}>{title}</DialogTitle>
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
                    color='error'
                    onClick={() => {
                        setConfirm(true);
                        setOpen(false);
                    }}
                    endIcon={<Delete />}>
                    Delete
                </Button>
            </Box>
        </Box>
    </Dialog>);
}

export default ConfirmDialog;
