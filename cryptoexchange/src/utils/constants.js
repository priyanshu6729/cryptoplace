// API URLs and Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.coingecko.com/api/v3';
export const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY || 'CG-TBWScqgUmmAXiPvBs4QdQFf5';

// Route paths
export const ROUTES = {
  HOME: '/',
  COIN_LIST: '/Coin-List',
  COIN_DETAILS: '/coin/:coinId',
}; 