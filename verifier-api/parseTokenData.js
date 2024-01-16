export const getTokenPrice = (tokenData) => {
    try {
        if ("market_data" in tokenData) {
            const marketData = tokenData.market_data;
            if ("current_price" in marketData) {
                const currentPrice = marketData.current_price;
                if ("usd" in currentPrice) {
                    return currentPrice.usd;
                }
            }
        }
        return 0;
    } catch (error) {
        console.log(error);
        return 0;
    }
};


export const getLogoUrl = (tokenData) => {
    try {
        if ("image" in tokenData) {
            const image = tokenData.image;
            return image.large;
        }
        return "";
    } catch (error) {
        console.log(error);
        return "";
    }
};
