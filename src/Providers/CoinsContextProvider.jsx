import axios from "axios";
import _ from "lodash";
import React, { useContext, useState, createContext, useEffect } from "react";
import styles from "./../Components/Filter&Sort/Filter&Sort-style/Filter&Sort.module.css";
const CoinsContext = createContext();
const CoinsContextProvider = createContext();
const CoinsShowContext = createContext();
const CoinsShowContextProvider = createContext();
const SearchValueContext = createContext();
const SearchValueContextProvider = createContext();
const MarketCapChangesStateContext = createContext();
const MarketCapChangesStateContextProvider = createContext();
const SelectCurrencyContext = createContext();
const SelectCurrencyContextProvider = createContext();
const SelectCurrencyValueContext = createContext();
const SelectCurrencyValueContextProvider = createContext();

const CoinsProvider = ({ children }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [coinsDataShow, setCoinsDataShow] = useState([...coinsData]);
  const [searchValue, setSearchValue] = useState("");
  const [marketCapChangesState, setMarketCapChangesState] = useState(0);
  const [selectCurrency, setSelectCurrency] = useState(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&page=1"
  );
  const [selectCurrencyValue, setSelectCurrencyValue] = useState("usd");

  <SearchValueContext.Provider value={searchValue}>
    <SearchValueContextProvider.Provider value={setSearchValue}>
      <MarketCapChangesStateContext.Provider value={marketCapChangesState}>
        <MarketCapChangesStateContextProvider.Provider value={setMarketCapChangesState}>
          {children}
        </MarketCapChangesStateContextProvider.Provider>
      </MarketCapChangesStateContext.Provider>
    </SearchValueContextProvider.Provider>
  </SearchValueContext.Provider>;

  return (
    <CoinsContext.Provider value={coinsData}>
      <CoinsContextProvider.Provider value={setCoinsData}>
        <CoinsShowContext.Provider value={coinsDataShow}>
          <CoinsShowContextProvider.Provider value={setCoinsDataShow}>
            <SelectCurrencyContext.Provider value={selectCurrency}>
              <SelectCurrencyContextProvider.Provider value={setSelectCurrency}>
                <SelectCurrencyValueContext.Provider value={selectCurrencyValue}>
                  <SelectCurrencyValueContextProvider.Provider value={setSelectCurrencyValue}>
                    <SearchValueContext.Provider value={searchValue}>
                      <SearchValueContextProvider.Provider value={setSearchValue}>
                        <MarketCapChangesStateContext.Provider value={marketCapChangesState}>
                          <MarketCapChangesStateContextProvider.Provider value={setMarketCapChangesState}>
                            {children}
                          </MarketCapChangesStateContextProvider.Provider>
                        </MarketCapChangesStateContext.Provider>
                      </SearchValueContextProvider.Provider>
                    </SearchValueContext.Provider>
                  </SelectCurrencyValueContextProvider.Provider>
                </SelectCurrencyValueContext.Provider>
              </SelectCurrencyContextProvider.Provider>
            </SelectCurrencyContext.Provider>
          </CoinsShowContextProvider.Provider>
        </CoinsShowContext.Provider>
      </CoinsContextProvider.Provider>
    </CoinsContext.Provider>
  );
};

export default CoinsProvider;

export const useCoinsShowContext = () => useContext(CoinsShowContext);
export const useCoinsShowContextProvider = () => useContext(CoinsShowContextProvider);
export const useSelectCurrencyValueContext = () => useContext(SelectCurrencyValueContext);
export const useSelectCurrencyValueContextProvider = () => useContext(SelectCurrencyValueContextProvider);
export const useSelectCurrencyContext = () => useContext(SelectCurrencyContext);
export const useSelectCurrencyContextProvider = () => useContext(SelectCurrencyContextProvider);

export const useCoinsContextProvider = () => {
  const coinsData = useContext(CoinsContext);
  const setCoinsData = useContext(CoinsContextProvider);
  const coinsDataShow = useContext(CoinsShowContext);
  const setCoinsDataShow = useContext(CoinsShowContextProvider);
  const searchValue = useContext(SearchValueContext);
  const setSearchValue = useContext(SearchValueContextProvider);
  const marketCapChangesState = useContext(MarketCapChangesStateContext);
  const setMarketCapChangesState = useContext(MarketCapChangesStateContextProvider);
  const selectCurrencyValue = useContext(SelectCurrencyValueContext);
  const setSelectCurrencyValue = useContext(SelectCurrencyValueContextProvider);
  const selectCurrency = useContext(SelectCurrencyContext);
  const setSelectCurrency = useContext(SelectCurrencyContextProvider);

  const [marketCap, setMarketCap] = useState(0);
  const [valueChanges, setValueChanges] = useState(0);
  const [sortValue, setSortValue] = useState("n");

  useEffect(() => {
    marketCapChanges();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setCoinsDataShow(coinsData);
    handlePrice();
    handleSelectCurrency(selectCurrencyValue);
    const { data } = await axios.get(selectCurrency);
    setCoinsDataShow(data);
    marketCapChanges();
    document.documentElement.scrollTop = 10;
    document.documentElement.scrollTop = 0;
  }, [selectCurrency]);

  const [coinsDataLoading, setCoinsDataLoading] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ]);

  let y = 0;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    y += 1;
    marketCapChanges();
    console.log(y);
    if (sortValue !== "") {
      await handleSort("", "");
      setCoinsDataShow(coinsData.filter((c) => (c.name + c.symbol).toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue]);

  const handlePrice = async () => {
    try {
      handleSelectCurrency(selectCurrencyValue);
      const { data } = await axios.get(selectCurrency);
      await setCoinsData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePrice = (e, x) => {
    let price = (x / e) * 100;
    return Number(price).toFixed(2);
  };

  const marketCapChanges = async () => {
    const { data } = await axios.get(selectCurrency);
    await setCoinsData(data);
    if (coinsData !== []) {
      await coinsData.map((c) => setMarketCap(c.market_cap));
      await coinsData.map((c) => setValueChanges(c.market_cap_change_24h));
    }
    ((Number(valueChanges) / Number(marketCap)) * 100).toFixed(2) === "NaN"
      ? setMarketCapChangesState(0)
      : setMarketCapChangesState(((Number(valueChanges) / Number(marketCap)) * 100).toFixed(2));
  };

  const modifyNumbers = (x) => {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleSelectCurrency = (e) => {
    setSelectCurrencyValue(e);
    setSelectCurrency(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${e}&per_page=250&page=1`);
    setCoinsDataShow(coinsData);
    handleSort("", "allToken");
    setSearchValue("");
  };

  const handleSearchValue = (e) => {
    setSearchValue(e);
    setCoinsDataShow(coinsData.filter((c) => (c.name + c.symbol).toLowerCase().includes(e.toLowerCase())));
    document.documentElement.scrollTop = 1;
    document.documentElement.scrollTop = 0;
  };

  const sortItems = document.getElementsByClassName(styles.sortItems);

  const handleSort = async (e, x) => {
    setSortValue(x);
    document.documentElement.scrollTop = 1;

    for (let i = 0; i < sortItems.length; i++) {
      sortItems[i].classList = `${styles.sortItems}`;
    }

    if (x === "") {
      await setCoinsDataShow(coinsData);
      sortItems[0].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (x === "allToken") {
      await setCoinsDataShow(coinsData);
      setSearchValue("");
      sortItems[0].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (x === "highestPrice") {
      await setCoinsDataShow(_.orderBy(coinsDataShow, ["current_price"], "desc"));
      sortItems[1].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (x === "lowestPrice") {
      await setCoinsDataShow(_.orderBy(coinsDataShow, ["current_price"], "asc"));
      sortItems[2].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (x === "changeAsc") {
      await setCoinsDataShow(_.orderBy(coinsDataShow, ["price_change_percentage_24h"], "desc"));
      sortItems[3].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (x === "changeDesc") {
      await setCoinsDataShow(_.orderBy(coinsDataShow, ["price_change_percentage_24h"], "asc"));
      sortItems[4].classList = `${styles.sortItems} ${styles.active}`;
    }

    if (e !== "") {
      e.target.classList = `${styles.sortItems} ${styles.active}`;
    }

    if (e === "") {
      sortItems[0].classList = `${styles.sortItems} ${styles.active}`;
    }

    document.documentElement.scrollTop = 0;
  };

  return {
    coinsData,
    marketCapChangesState,
    selectCurrency,
    selectCurrencyValue,
    handlePrice,
    handleChangePrice,
    marketCapChanges,
    modifyNumbers,
    handleSelectCurrency,
    setCoinsData,
    coinsDataShow,
    setCoinsDataShow,
    searchValue,
    setSearchValue,
    handleSearchValue,
    handleSort,
    setSortValue,
    sortValue,
    coinsDataLoading,
  };
};
