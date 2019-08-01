import { getAllSymbolsData } from '../libs/stock-api-lib';
import { getFilteredStocks } from '../libs/stock-lib';
import { sendProposedStocksMail } from '../libs/mail-lib';

export const main = async () => {
    try {
        const allStocks = await getAllSymbolsData();
        const filteredStocks = getFilteredStocks(allStocks);
        await sendProposedStocksMail(filteredStocks, allStocks.length);
        console.log('Mail with filtered stocks sent correctly');
        return true;
    }
    catch(err) {
        console.error(err);
    }
};
