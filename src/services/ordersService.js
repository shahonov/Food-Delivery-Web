import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const ordersService = {
    createOrder: orderInfo => httpService.post(endpoints.orders.create, { orderInfo }),
    getOwnerOrders: ownerId => httpService.get(endpoints.orders.getOwnerOrders(ownerId)),
    getUserOrders: userId => httpService.get(endpoints.orders.getUserOrders(userId)),
    editOrderStatus: (orderId, status, updateTime) => httpService.patch(endpoints.orders.editOrderStatus, { orderId, status, updateTime })
}