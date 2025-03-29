import  { useContext, useEffect, useState } from "react";
import "./Search.css";
import { CoinContext } from "../../context/CoinContext";
import Loader from "../../components/NavBar/Loader";
import { Link } from "react-router-dom";

const Search = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [loadedCoins, setLoadedCoins] = useState(10);
  const [input , setInput] = useState("");

  useEffect(() => {
    if (allCoins) {
      setDisplayCoins(allCoins);
    }
  }, [allCoins]);

    const {setCurrency} = useContext(CoinContext);
  
    const handleCurrencyChange = (e) => {
      setCurrency({
        name: e.target.value,
        symbol: e.target.value === "usd" ? "$" : e.target.value === "eur" ? "€" : "₹"
      });
    };

    const loadMoreCoins = () => {
      setLoadedCoins((prev) => prev + 10);
    };

    const inputHandler = (event) => {
     setInput(event.target.value);
     if(!event.target.value){
       setDisplayCoins(allCoins);
    }}

    const searchHandler = async (event) => {
      event.preventDefault();
      const filteredCoins = await allCoins.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
      }); 
      setDisplayCoins(filteredCoins);
    }

  return (
    <div className="coins_page">
      <div className="search_coin">
        <h1>Welcome to the Cryptocurrency Invent...</h1>
        <p>
          Search for a currency live for pricing and market share. Explore the
          top crypto pricing below.
        </p>

        <form onSubmit={searchHandler}>
          <input
          onChange={inputHandler}
          value={input}
            list="crypto"
            type="text"
            placeholder="Search crypto..."
            name="search"
            id="search"
            required
          />

          <datalist id="crypto">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />))}
          </datalist>
          <button type="submit">Search</button>
        </form>

        <select className="dropMenu" name="currency" id="currency" onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market_cap" style={{ textAlign: "right" }}>Market Cap</p>
        </div>

        {displayCoins.length === 0 ? (
         <Loader />
        ) : (
          displayCoins.slice(0, loadedCoins).map((item, index) => (
            <Link to={`/coin/${item.id}`} style={{ textDecoration: "none"}} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img className="coin_img" src={item.image} alt="" />
                <p>{item.name + "-" + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p style={{ textAlign: "center" }} className={item.price_change_percentage_24h>0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market_cap" style={{ textAlign: "right" }}>
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        )}
      </div>
      <div className="load-more">
  {loadedCoins >= displayCoins.length ? (
    <h3>No more coins to load..</h3>
  ) : (
    <button onClick={loadMoreCoins}>Load More</button>
  )}
</div>
    </div>
  ); 
};

export default Search;   
