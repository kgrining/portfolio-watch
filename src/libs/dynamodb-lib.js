import DynamoDB from 'aws-sdk/clients/dynamodb';

export const fetchAllSymbols = async tableName => {
    console.log(`Running fetchAllSymbols on ${tableName}`);
    const dynamodb = new DynamoDB.DocumentClient();
    const params = {
        TableName: tableName
    };
    return dynamodb.scan(params).promise().then((result) => {
        console.log(`Fetched ${result.Items.length} item(s) from database`);
        return result.Items;
    }).catch((error) => {
        console.error(error);
        throw new Error(error.message);
    });
};
