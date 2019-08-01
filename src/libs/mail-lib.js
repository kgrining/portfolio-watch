import SES from 'aws-sdk/clients/ses';

const ses = new SES();

const SENDER_MAIL_ADDRESS = 'YOUR_EMAIL_ADDRESS'; // TODO: add addresses to DynamoDB and do lambdas per address/user

const getProposedStocksContent = (filteredStocks, allStocksNumber) =>
    `Hello, <br><br> this is your humble servant from AWS cloud. Out of ${allStocksNumber} stocks I found the following ${filteredStocks.length} which you might consider: <br><br> ${filteredStocks.join('<br>')} <br><br> With utmost respect, <br> Your servant`;

const getSellStockContent = stockSymbol => `${stockSymbol} seems ready to sell`;

const buildParams = (receivers, content, subject) => {
    return {
        Destination: {
            ToAddresses: receivers
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: content
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: SENDER_MAIL_ADDRESS
    };
};

const buildProposedStocksParams = (receivers, filteredStocks, allStocksNumber) =>
    buildParams(receivers, getProposedStocksContent(filteredStocks, allStocksNumber), 'PortfolioWatch stocks report');

const buildSellStockParams = (receivers, stockSymbol) =>
    buildParams(receivers, getSellStockContent(stockSymbol), `PortfolioWatch single stock: ${stockSymbol}`);

export const sendProposedStocksMail = async (filteredStocks, allStocksNumber, receivers = [SENDER_MAIL_ADDRESS]) => {
    const mailParams = buildProposedStocksParams(receivers, filteredStocks, allStocksNumber);
    return ses.sendEmail(mailParams).promise()
        .then(() => console.log('Proposed stocks mail sent correctly.'))
        .catch(err => console.error(err));
};

export const sendSellStockMail = async (stockSymbol, receivers = [SENDER_MAIL_ADDRESS]) => {
    const mailParams = buildSellStockParams(receivers, stockSymbol);
    return ses.sendEmail(mailParams).promise()
        .then(() => console.log('Sell stock mail sent correctly.'))
        .catch(err => console.error(err));
};