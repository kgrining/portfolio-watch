import { fetchAllSymbols } from '../libs/dynamodb-lib';
import { sendToSns } from '../libs/sns-lib';

export const main = async () => {
    try {
        const allSymbolsData = await fetchAllSymbols(process.env.dynamoTableName);
        await Promise.all(allSymbolsData.map(_ => sendToSns(_, process.env.snsFanoutTopicArn)));
        console.log('All messages sent to SNS');
        return true;
    } catch (err) {
        console.error(err);
    }
};
