import axios from 'axios';
import Constants from 'expo-constants';

const rawApiKey = Constants?.expoConfig?.extra?.googleBooksApiKey || Constants?.manifest?.extra?.googleBooksApiKey;
const API_KEY = rawApiKey && rawApiKey !== 'YOUR_API_KEY' ? rawApiKey : '';
const BASE_URL = 'https://www.googleapis.com/books/v1';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

export async function searchBooks(query, signal) {
  const response = await client.get('/volumes', {
    signal,
    params: {
      q: query,
      ...(API_KEY ? { key: API_KEY } : {}),
    },
  });
  return response.data;
}
