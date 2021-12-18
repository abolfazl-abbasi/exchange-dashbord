import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar.jsx";
import { useCoinsContextProvider } from "../Providers/CoinsContextProvider.jsx";
import CoinData from "./../Components/CoinData/CoinData.jsx";
import styles from "./App-style/App.module.css";

const App = () => {
  const { handlePrice, coinsData } = useCoinsContextProvider();

  useEffect(() => {
    handlePrice();
  }, []);

  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <Navbar />
        {coinsData === [] ? (
          <p>Loading ...</p>
        ) : (
          coinsData.map((c) => {
            return (
              <CoinData
                key={c.id}
                name={c.name}
                symbol={c.symbol}
                marketCapRank={c.market_cap_rank}
                price={c.current_price}
                image={c.image}
                todayChanges={c.price_change_24h}
                lastUpdate={c.last_updated}
                marketCap={c.market_cap}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default App;
