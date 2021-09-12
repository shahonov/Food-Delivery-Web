import React from 'react';
import {
    Card,
    Table,
    Button,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Typography,
    TableContainer,
} from "@material-ui/core";
import { AccessibilityNew, DeleteForeverOutlined } from "@material-ui/icons";

import './UsersInfoForm.scss';

const UsersInfoForm = ({
    user,
    customers,
    onBlockCustomer,
    onUnblockCustomer
}) => {
    return (
        <form className='users-info-form'>
            <Card elevation={10} className='users-info-form-card'>
                <Typography variant='h5' className='card-header syncopate'>Customers info</Typography>
                {
                    Object.keys(customers).length > 0
                        ?
                        <TableContainer>
                            <Table aria-label='users info table' className='users-info-form-table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' className='table-head-cell'>
                                            <Typography variant='h5' className='special'>Full name</Typography>
                                        </TableCell>
                                        <TableCell align='center' className='table-head-cell'>
                                            <Typography variant='h5' className='special'>Delivery address</Typography>
                                        </TableCell>
                                        <TableCell align='center' className='table-head-cell'>
                                            <Typography variant='h5' className='special'>Phone</Typography>
                                        </TableCell>
                                        <TableCell align='center' className='table-head-cell'>
                                            <Typography variant='h5' className='special'>Total orders</Typography>
                                        </TableCell>
                                        <TableCell align='center' className='table-head-cell'>
                                            <Typography variant='h5' className='special'>Total amount paid</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Object.keys(customers).map(_id => {
                                            const customer = customers[_id][0];
                                            const totalOrders = customers[_id].length;
                                            const totalAmount = (() => {
                                                let total = 0;
                                                customers[_id]?.forEach(order => {
                                                    order?.meals.forEach(meal => {
                                                        total += Number(meal.price) * Number(meal.quantity);
                                                    })
                                                })
                                                return total;
                                            })();
                                            const isBlocked = user.blockedUsers.includes(_id);
                                            return (
                                                <TableRow hover className={`${isBlocked ? 'blocked' : ''}`} key={_id}>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        <Typography className='special'>{customer.fullName}</Typography>
                                                    </TableCell>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        <Typography className='special'>{customer.deliveryAddress}</Typography>
                                                    </TableCell>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        <Typography className='special'>{customer.phone}</Typography>
                                                    </TableCell>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        <Typography className='special'>{totalOrders}</Typography>
                                                    </TableCell>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        <Typography className='special'>{totalAmount}</Typography>
                                                    </TableCell>
                                                    <TableCell align='center' className='table-body-cell'>
                                                        {
                                                            isBlocked
                                                                ?
                                                                <Button
                                                                    variant='contained'
                                                                    className='unblock-btn'
                                                                    startIcon={<AccessibilityNew />}
                                                                    onClick={() => onUnblockCustomer(_id)}
                                                                >
                                                                    Unblock
                                                                </Button>
                                                                :
                                                                <Button
                                                                    variant='contained'
                                                                    className='block-btn'
                                                                    startIcon={<DeleteForeverOutlined />}
                                                                    onClick={() => onBlockCustomer(_id)}
                                                                >
                                                                    Block
                                                                </Button>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <Typography variant='h6' className='syncopate'>No customers found</Typography>
                }
            </Card>
        </form>
    )
}

export default UsersInfoForm;
