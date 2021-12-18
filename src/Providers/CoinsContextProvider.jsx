import axios from "axios";
import React, { useContext, useState, createContext } from "react";
const CoinsContext = createContext();
const CoinsContextProvider = createContext();

const CoinsProvider = ({ children }) => {
  const [coinsData, setCoinsData] = useState([]);
  return (
    <CoinsContext.Provider value={coinsData}>
      <CoinsContextProvider.Provider value={setCoinsData}>{children}</CoinsContextProvider.Provider>
    </CoinsContext.Provider>
  );
};

export default CoinsProvider;

export const useCoinsContextProvider = () => {
  const coinsData = useContext(CoinsContext);
  const setCoinsData = useContext(CoinsContextProvider);

  const handlePrice = async () => {
    try {
      const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1");
      setCoinsData(data.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  };
  console.log();
  return { coinsData, handlePrice };
};
