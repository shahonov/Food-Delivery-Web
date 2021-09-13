/* istanbul ignore file */

import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const restaurantsService = {
    /**
     * 
     * @param {string|number} from 
     * @param {string|number} to
     * @returns RestaurantsArray
     */
    get: (from, to) => httpService.get(endpoints.restaurants.get)
}
