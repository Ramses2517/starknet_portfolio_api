import {getTokensListFromCoinGecko} from "./getTokensListFromCoingecko.js";
import {sliceIntoChunks} from "../shared/utils/sliceIntoChunks.js";
import {PAGE_LIMIT} from "../shared/constants/limits.js";
import {getDataByIdsArray} from "./getDataByIdsArray.js";
import {STARKNET} from "../shared/constants/names.js";


export const tokenVerifier = async () => {
    const tokenList = await getTokensListFromCoinGecko();
    const tokenListIds = tokenList.map((x) => x.id);
    const slicePacks = sliceIntoChunks(tokenListIds, PAGE_LIMIT);

    let tokensData = {}
    for (const pack of slicePacks ?? []) {
        console.log(
            "Get pack data:",
            slicePacks.indexOf(pack) + 1,
            "from",
            slicePacks.length
        );
        const packData = await getDataByIdsArray(pack);
        tokensData = {...tokensData, ...packData};
    }


    const result = []
    for (const token of tokenList ?? []) {
        const tokenData = tokensData[token.id];
        let address = token.platforms[STARKNET].toLowerCase()
        if (address.length === 65) {
            address = '0x0' + address.slice(2)
        }
        if (address.length === 64) {
            address = '0x00' + address.slice(2)
        }
        const tokenObj = {
            address: address,
            name: token.name,
            price: tokenData?.price,
            logo_url: tokenData?.logo_url
        }
        result.push(tokenObj)


    }
    return result;
};

