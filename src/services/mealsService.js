/* istanbul ignore file */

import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const mealsService = {
    /**
     * 
     * @param {string} ownerId
     * @returns MealsArray
     */
    getOwnerMeals: (ownerId, from, to) => httpService.get(endpoints.meals.getOwnerMeals(ownerId)),
    /**
     * 
     * @param {string} ownerId
     * @param {object} meal
     * @returns isSuccess and _id
     */
    addOwnerMeal: (ownerId, meal) => httpService.post(endpoints.meals.addOwnerMeal, { ownerId, meal }),
    /**
     * 
     * @param {string} ownerId
     * @param {string} mealId
     * @returns isSuccess
     */
    deleteOwnerMeal: (ownerId, mealId) => httpService.delete(endpoints.meals.deleteOwnerMeal, { ownerId, mealId }),
    /**
     * 
     * @param {string} mealId
     * @param {string|number} oldOrderId
     * @param {string|number} newOrderId
     * @returns isSuccess
     */
    changeMealOrder: (mealId, oldOrderId, newOrderId) => httpService.patch(endpoints.meals.changeMealOrder, { mealId, oldOrderId, newOrderId })
}
