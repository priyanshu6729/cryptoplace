import { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import Loader from '../../components/NavBar/Loader';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCoinData(), fetchHistoricalData()]).finally(() => setLoading(false));
  }, [currency, coinId]);

  if (loading) return <Loader />;
  if (!coinData || !historicalData) return <p>Error loading data. Please try again later.</p>;

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData?.image?.large || ''} alt="coin" />
        <p><b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData?.market_cap_rank || 'N/A'}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData?.market_data?.current_price[currency.name.toLowerCase()].toLocaleString() || 'N/A'}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinData?.market_data?.market_cap[currency.name.toLowerCase()].toLocaleString() || 'N/A'}</li>
        </ul>
        <ul>
          <li>24H High</li>
          <li>{currency.symbol} {coinData?.market_data?.high_24h[currency.name.toLowerCase()].toLocaleString() || 'N/A'}</li>
        </ul>
        <ul>
          <li>24H Low</li>
          <li>{currency.symbol} {coinData?.market_data?.low_24h[currency.name.toLowerCase()].toLocaleString() || 'N/A'}</li>
        </ul>
        
        <div className="coin-description">
          <h1>About</h1>
          <p>{coinData?.description?.en || 'No description available'}</p>
        </div>
        <div className="coin-links">
          <h3>Related Links:</h3>
          <a href={coinData?.links?.homepage?.[0] || '#'} target="_blank" rel="noreferrer">Homepage</a> ||
          <a href={coinData?.links?.blockchain_site?.[0] || '#'} target="_blank" rel="noreferrer">Blockchain</a> ||
          <a href={coinData?.links?.repos_url?.github?.[0] || '#'} target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </div>
  );
};

export default Coin;
