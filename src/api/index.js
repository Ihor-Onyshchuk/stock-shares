import axios from 'axios';
import { API_TOKEN } from '../api-token';

const http = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable',
});

export const getStockInfo = () => (
  http.get(`/stock/market/list/mostactive?&listLimit=10&token=${API_TOKEN}`)
);