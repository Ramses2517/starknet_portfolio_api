import {COINGECKO_API} from "../shared/constants/urls.js";
import {PAGE_LIMIT, TWO_SECONDS} from "../shared/constants/limits.js";
import {sleep} from "../shared/utils/sleep.js";

export const getDataByIdsArray = async (ids) => {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/markets?vs_currency=usd&per_page=${PAGE_LIMIT}&ids=${ids.toString()}`
        );
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
                        return await getDataByIdsArray(ids);
                    }
                }
                throw new Error(`Error ${status.error_code}`);
            }
        }
        return data.reduce((acc, token) => {
            acc[token.id] = {
                price: token.current_price || null,
                logo_url: token.image || null,
            };
            return acc;
        }, {});
    } catch (error) {
        const errorMsg = `🔴TOKEN-VERIFIER error | Can't get token data for tokens | try again in 2 seconds`;
        console.log(error);
        console.log(errorMsg);
        await sleep(TWO_SECONDS);
        return getDataByIdsArray(ids);
    }
};
