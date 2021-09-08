import {
    Table,
    Button,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Typography,
    TableContainer,
} from "@material-ui/core";
import { DeleteForeverOutlined } from "@material-ui/icons";

import './OrderMealsTable.scss';

const OrderMealsTable = ({ meals, onRemove }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead className='table-head'>
                    <TableRow>
                        <TableCell align='center'>
                            <Typography className='special bold'>Meal name</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography className='special bold'>Meal type</Typography>
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
                        <TableCell align='center'>
                            <Typography className='special bold'>Actions</Typography>
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
                                        <Typography className='special'>{x.mealType}</Typography>
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
                                    <TableCell align='center'>
                                        <Button
                                            variant='contained'
                                            className='remove-btn'
                                            onClick={() => onRemove(x._id)}
                                            startIcon={<DeleteForeverOutlined />}
                                        >
                                            Remove
                                        </Button>
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

export default OrderMealsTable;
