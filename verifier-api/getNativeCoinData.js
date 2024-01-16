import {STARKNET} from "../shared/constants/names.js";
import {getTokenDataById} from "./getDataById.js";

export const getNativeCoinData = async (chain) => {
    try {
        return await getTokenDataById(STARKNET);
    } catch (error) {
        console.log(chain)
        console.log(error);
        return null;
    }
};
