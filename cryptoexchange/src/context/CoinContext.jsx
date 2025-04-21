import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import CoinContext from './CoinContextDefinition';
import { API_BASE_URL, API_KEY } from '../utils/constants';

const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });
  const [error, setError] = useState(null);

  const fetchAllCoins = useCallback(async () => {
    try {
      // Using constants for API URL and key
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": API_KEY,
        },
      };

      // First try with API key
      let response = await fetch(
        `${API_BASE_URL}/coins/markets?vs_currency=${currency.name}`,
        options
      );

      // If that fails, try without API key as fallback
      if (!response.ok && response.status === 401) {
        response = await fetch(
          `${API_BASE_URL}/coins/markets?vs_currency=${currency.name}`
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAllCoins(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching coins:", error);
      setError("Failed to fetch cryptocurrency data. Please try again later.");
    }
  }, [currency]); // Only re-create when currency changes

  useEffect(() => {
    fetchAllCoins();
  }, [fetchAllCoins]); // fetchAllCoins already depends on currency

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    error
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

// Add PropTypes validation
CoinContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CoinContextProvider;