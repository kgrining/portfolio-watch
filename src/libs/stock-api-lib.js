import axios from 'axios';
import flatten from 'lodash.flatten';

import { companiesChunks } from '../constants/stock-const';
import get from 'lodash.get';

const API_KEY = 'YOUR_OWN_API_KEY'; // TODO: use AWS Key Management Service instead of this sadness :(
const API_URL = 'https://api.worldtradingdata.com/api/v1/stock';

const buildApiUrl = symbols => `${API_URL}?symbol=${symbols.join(',')}&api_token=${API_KEY}`;

export const getSingleSymbolData = symbol => axios.get(buildApiUrl([symbol]))
    .then(({ data }) => get(data, ['data','0']))
    .catch(err => console.error(err));

export const getAllSymbolsData = async () => {
    const promises = companiesChunks.map(pack => axios.get(buildApiUrl(pack)));
    const allStocksChunks = await axios.all(promises);
    return flatten(allStocksChunks.map(({ data: { data } }) => data));
};