import {OKLINK_API_KEY, STARKNET_API_KEY} from "../shared/constants/restApiConf.js";
import {OKLINK_API, STARKNET_API} from "../shared/constants/urls.js";
import {STARKNET} from "../shared/constants/names.js";
import {
    eventTypeConversion,
    nftBalanceTypeConversion,
    nftContractTypeConversion,
    tokenTypeConversion,
    transactionTypeConversion
} from "./typeConversion.js";
import {sleep} from "../shared/utils/sleep.js";

const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-api-key': STARKNET_API_KEY, 'Ok-Access-Key': OKLINK_API_KEY}
};


const OKLINK_MAX_LIMIT = 50;
const STARKSCAN_MAX_LIMIT = 100;
const MAX_PAGE = 15;

export const getTokensByPage = async (address, page) => {
    let url = `${OKLINK_API}/token-balance-starknet?limit=${OKLINK_MAX_LIMIT}&address=${address}&chainShortName=${STARKNET}&page=${page}&protocolType=token_20`
    const response = await fetch(url, options)
    const data = await response.json();
    const tokens = data?.data?.tokenList;
    return tokens?.map((tokenObject) => tokenTypeConversion(tokenObject)) || [];
}


export const getTokensView = async (address) => {
    try {
        let page = 1;
        const tokens = []
        while (page <= MAX_PAGE) {
            const pageTokens = await getTokensByPage(address, page)
            if (pageTokens.length) {
                tokens.push(...pageTokens);
                page += 1;
                await sleep(500)
            } else {
                break;
            }
        }
        return tokens
    } catch (error) {
        console.log('getTokensView', address, error)
        return null
    }
}


export const getEventsView = async (address) => {
    try {
        let url = `${STARKNET_API}/events?from_address=${address}&limit=${STARKSCAN_MAX_LIMIT}`
        let page = 1
        const result = []
        while (page <= MAX_PAGE) {
            const apiResponse = await fetch(url, options);
            const apiData = await apiResponse.json()
            result.push(...apiData?.data?.map((txObj) => eventTypeConversion(txObj)))
            url = apiData?.next_url || null;
            if (url === null) {
                break
            }
            page += 1;
            await sleep(500)
        }
        return result
    } catch (error) {
        console.log('getEventsView', address, error)
        return null
    }
}


export const getTransactionsView = async (address) => {
    try {
        let url = `${STARKNET_API}/transactions?contract_address=${address}&limit=${STARKSCAN_MAX_LIMIT}`
        let page = 1
        const result = []
        while (page <= MAX_PAGE) {
            const apiResponse = await fetch(url, options);
            const apiData = await apiResponse.json()
            result.push(...apiData?.data?.map((txObj) => transactionTypeConversion(txObj)))
            url = apiData?.next_url || null;
            if (url === null) {
                break
            }
            page += 1;
            await sleep(500)
        }
        return result
    } catch (error) {
        console.log('getTransactionsView', address, error)
        return null
    }
}


export const getNftBalanceView = async (address) => {
    try {
        let url = `${STARKNET_API}/nfts?owner_address=${address}&limit=${STARKSCAN_MAX_LIMIT}`
        let page = 1
        const result = []
        while (page <= MAX_PAGE) {
            const apiResponse = await fetch(url, options);
            const apiData = await apiResponse.json()
            result.push(...apiData?.data?.map((txObj) => nftBalanceTypeConversion(txObj)))
            url = apiData?.next_url || null;
            if (url === null) {
                break
            }
            page += 1;
        }
        return result
    } catch (error) {
        console.log('getNftBalanceView', address, error)
        return null
    }
}


export const getNftContractView = async (contractAddress) => {
    try {
        let url = `${STARKNET_API}/nft-contract/${contractAddress}`
        const apiResponse = await fetch(url, options);
        const apiData = await apiResponse.json()
        return nftContractTypeConversion(apiData)
    } catch (error) {
        console.log('getNftContractView', contractAddress, error)
        return null
    }
}