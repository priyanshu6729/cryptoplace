import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import CoinContext from './CoinContextDefinition';

const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });
  const [error, setError] = useState(null);

  const fetchAllCoins = useCallback(async () => {
    try {
      // Get API key from environment variable, with fallback
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY || "CG-TBWScqgUmmAXiPvBs4QdQFf5";

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apiKey,
        },
      };

      // First try with API key
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );

      // If that fails, try without API key as fallback
      if (!response.ok && response.status === 401) {
        response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
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