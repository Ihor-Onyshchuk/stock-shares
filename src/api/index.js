import axios from 'axios';
import { API_TOKEN } from '../api-token';

const http = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable',
});
