const ACCEPTABLE_PERCENTILE = 0.1;

// very basic cheap stock checker
const lowPricedStocksFilter = ({ price, '52_week_low': lowest, '52_week_high': highest }) =>
    ((price - lowest) / (highest - lowest)) < ACCEPTABLE_PERCENTILE;

export const getFilteredStocks = allStocks =>
    allStocks
    .filter(lowPricedStocksFilter)
    .map(({ name, symbol }) => `${name} (${symbol})`);

// very basic close position checker :)
export const hasEnoughProfit = (stockInfo, breakEvenPrice) => stockInfo.price > breakEvenPrice * 1.1;
