/*istanbul ignore file */

import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Typography,
    TableContainer,
} from "@material-ui/core";

const CardMealsTable = ({
    meals
}) => {
    return (
        <TableContainer>
            <Table>
                <TableHead className='table-head'>
                    <TableRow>
                        <TableCell align='center'>
                            <Typography className='special bold'>Meal name</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography className='special bold'>Net weight</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography className='special bold'>Quantity</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography className='special bold'>Total price</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        meals.map((x, i) => {
                            return (
                                <TableRow key={i} hover>
                                    <TableCell align='center'>
                                        <Typography className='special'>{x.mealName}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography className='special'>{x.netWeight}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography className='special'>{x.quantity}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography className='special'>{x.price * x.quantity}</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CardMealsTable;
