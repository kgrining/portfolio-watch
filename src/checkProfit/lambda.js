import { getSingleSymbolData } from '../libs/stock-api-lib';
import { hasEnoughProfit } from '../libs/stock-lib';
import { sendSellStockMail } from '../libs/mail-lib';

export const main = async event => {
    try {
        const { Message } = event.Records[0].Sns;
        const { symbol, breakEvenPrice } = JSON.parse(Message);
        const stockInfo = await getSingleSymbolData(symbol);
        if (hasEnoughProfit(stockInfo, breakEvenPrice)) {
            await sendSellStockMail(symbol);
            console.log('Mail sent successfully');
        }
        console.log(`CheckProfit for ${symbol} finished successfully`);
        return true;
    } catch(err) {
        console.error(err);
    }

};
