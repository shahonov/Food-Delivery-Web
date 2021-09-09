/* istanbul ignore file */

import { httpService } from "./httpService";
import { endpoints } from "constants/endpoints";

export const cryptoService = {
    /**
     * @returns publicRSAKey and encryptionId
     */
    getEncryptionInfo: () => httpService.get(endpoints.crypto.publicRSAKey)
}