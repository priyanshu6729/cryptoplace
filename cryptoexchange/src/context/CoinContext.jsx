import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import CoinContext from './CoinContextDefinition';

const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });

  const fetchAllCoins = useCallback(async () => {
    try {
      // Get API key from environment variable
      const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apiKey,
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setAllCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  }, [currency]); // Only re-create when currency changes

  useEffect(() => {
    fetchAllCoins();
  }, [fetchAllCoins]); // fetchAllCoins already depends on currency

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
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