import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const restaurantsService = {
    get: (from, to) => httpService.get(endpoints.restaurants.get(from, to))
}
