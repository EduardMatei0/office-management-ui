import {Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography} from "@mui/material";
import * as React from "react";
import Groups2Icon from "@mui/icons-material/Groups2";

interface MultipleDataCellProps {
    list: string[];
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        borderRadius: '20px',
        font: 'Roboto'
    },
}));

const MultipleDataCell = (props: MultipleDataCellProps) => {
    const {list} = props;

    return (<Box sx={{display: 'flex', alignItems: 'center'}}>
        <Box sx={{marginRight: '5px'}}> {list.length === 1 ? list : 'Multiple'} </Box>
        <HtmlTooltip title={
            <React.Fragment>
                {list.map(el => (<Typography key={el}>{el}</Typography>))}
            </React.Fragment>
        } >
            <Groups2Icon />
        </HtmlTooltip>
    </Box>)
}

export default MultipleDataCell;
