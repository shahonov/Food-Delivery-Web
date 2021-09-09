/* istanbul ignore file */

import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const ordersService = {
    /**
     * 
     * @param {object} orderInfo
     * @returns isSuccess
     */
    createOrder: orderInfo => httpService.post(endpoints.orders.create, { orderInfo }),
    /**
     * 
     * @param {string} ownerId
     * @returns OrdersArray
     */
    getOwnerOrders: ownerId => httpService.get(endpoints.orders.getOwnerOrders(ownerId)),
    /**
     * 
     * @param {string} userId
     * @returns OrdersArray
     */
    getUserOrders: userId => httpService.get(endpoints.orders.getUserOrders(userId)),
    /**
     * 
     * @param {string} orderId
     * @param {string} orderId
     * @param {number} updateTime
     * @returns isSuccess
     */
    editOrderStatus: (orderId, status, updateTime) => httpService.patch(endpoints.orders.editOrderStatus, { orderId, status, updateTime })
}