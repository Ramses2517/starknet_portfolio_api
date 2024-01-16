import {COINGECKO_API} from "../shared/constants/urls.js";
import {getLogoUrl, getTokenPrice} from "./parseTokenData.js";
import {sleep} from "../shared/utils/sleep.js";
import {TWO_SECONDS} from "../shared/constants/limits.js";

export const getTokenDataById = async (tokenId) => {
    try {
        const response = await fetch(`${COINGECKO_API}/coins/${tokenId}/`);
        const data = await response.json();
        if ("status" in data) {
            const status = data.status;
            if ("error_code" in status) {
                const error = status.error_code;
                if (error === 429) {
                    const timeout = response.headers.get("retry-after");
                    console.log(`Error 429 | to try one more time in ${timeout} seconds`);
                    if (timeout) {
                        await sleep(timeout * 1000);
                        return await getTokenDataById(tokenId);
                    }
                }
                throw new Error(`Error ${status.error_code}`);
            }
        }
        const price = getTokenPrice(data);
        const logo_url = getLogoUrl(data);
        return {price, logo_url};
    } catch (error) {
        const errorMsg = `🔴TOKEN-VERIFIER error | Can't get token data for token_id: ${tokenId} | try again in 2 seconds`;
        console.log(error);
        console.log(errorMsg);
        await sleep(TWO_SECONDS);
        return getTokenDataById(tokenId);
    }
};
