import {COINGECKO_API} from "../shared/constants/urls.js";
import {sleep} from "../shared/utils/sleep.js";
import {stopScript} from "../shared/utils/stopScript.js";
import {STARKNET} from "../shared/constants/names.js";


export const getTokensListFromCoinGecko = async () => {
    try {
        const response = await fetch(
            `${COINGECKO_API}/coins/list?include_platform=true`
        );
        const data = await response.json();
        if (data.length) {
            return data?.filter((x) => {
                const platforms = Object.keys(x?.platforms)
                if (platforms.length > 0 && platforms.includes(STARKNET)) {
                    return x
                }

            });
        } else {
            if ("status" in data) {
                const status = data.status;
                if ("error_code" in status) {
                    const error = status.error_code;
                    if (error === 429) {
                        const timeout = response.headers.get("retry-after");
                        console.log(
                            `Error 429 | to try one more time in ${timeout} seconds`
                        );
                        if (timeout) {
                            await sleep(timeout * 1000);
                            return await getTokensListFromCoinGecko();
                        }
                    }
                }
            }
            throw new Error("Empty tokens list");
        }
    } catch (error) {
        const errorMsg = "🔴TOKEN-VERIFIER error | Can't get list of tokens";
        console.log(errorMsg);
        stopScript();
    }
};
