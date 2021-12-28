import React, { useState, useEffect } from "react";
import { useCoinsContextProvider, useCoinsShowContext, use } from "../../Providers/CoinsContextProvider";
import styles from "./CoinData-style/CoinData.module.css";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import _ from "lodash";
import ContentLoader, { Facebook } from "react-content-loader";
import LazyLoad from "react-lazyload";

const CoinData = () => {
  const { coinsData, handleChangePrice, marketCapChanges, modifyNumbers, coinsDataLoading, selectCurrencyValue } =
    useCoinsContextProvider();

  const handleSelectCurrencySymbol = () => {
    if (selectCurrencyValue === "usd") return "$";
    if (selectCurrencyValue === "eur") return "€";
    if (selectCurrencyValue === "gbp") return "£";
    if (selectCurrencyValue === "jpy") return "¥";
    if (selectCurrencyValue === "try") return "₺";
    if (selectCurrencyValue === "inr") return "₹";
    if (selectCurrencyValue === "cny") return "¥";
    if (selectCurrencyValue === "krw") return "₩";
    if (selectCurrencyValue === "sek") return "kr";
    if (selectCurrencyValue === "aud") return "A$";
  };

  const coinsDataShow = useCoinsShowContext();

  return (
    <>
      <section className={`${styles.coinsData}`}>
        <div className={`${styles.coinsMainContainer}`}>
          <table className={`${styles.coinTable}`}>
            <thead>
              <tr className={`${styles.coinContainer}`} key="">
                <th className={`${styles.coinDataHead}`}>
                  <span data-tip="Market Cap Rank">#</span>
                  <ReactTooltip />
                </th>
                <th className={`${styles.coinDataHead}`}>Token Name</th>
                <th className={`${styles.coinDataHead}`}>Price</th>
                <th className={`${styles.coinDataHead}`}>24h Change</th>
                <th className={`${styles.coinDataHead}`}>Market Cap</th>
                <th className={`${styles.coinDataHead}`}>Volume</th>
                <th className={`${styles.coinDataHead}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coinsData.length === 0
                ? coinsDataLoading.map((c) => {
                    return (
                      <tr className={`${styles.coinContainer}`} key={c.id}>
                        <td className={`${styles.coinData}`}>{c.id}</td>
                        <td className={`${styles.coinData} ${styles.coinNameData}`}>
                          <div className={`${styles.loader1} ${styles.loader}`}></div>
                          <span>
                            <span className={`${styles.coinName}`}>
                              <div className={`${styles.loader2} ${styles.loader}`}></div>
                            </span>
                          </span>
                        </td>
                        <td className={`${styles.coinData}`}>
                          <div className={`${styles.loader3} ${styles.loader}`}></div>
                        </td>
                        <td className={`${styles.coinData}`}>
                          <div className={`${styles.loader4} ${styles.loader}`}></div>
                        </td>
                        <td className={`${styles.coinData}`}>
                          <div className={`${styles.loader5} ${styles.loader}`}></div>
                        </td>
                        <td className={`${styles.coinData}`}>
                          <div className={`${styles.loader6} ${styles.loader}`}></div>
                        </td>
                        <td className={`${styles.coinData}`}>
                          <div className={`${styles.loader7} ${styles.loader}`}></div>
                        </td>
                      </tr>
                    );
                  })
                : coinsDataShow.map((c) => {
                    return (
                      <tr key={c.id}>
                        <LazyLoad className={`${styles.coinContainer}`} once>
                          <td className={`${styles.coinData}`}>{c.market_cap_rank}</td>
                          <td className={`${styles.coinData} ${styles.coinNameData}`}>
                            {c.image ? (
                              <img src={c.image} alt="" className={`${styles.coinImage}`} />
                            ) : (
                              <div className={`${styles.loader1} ${styles.loader}`}></div>
                            )}
                            <span>
                              <span className={`${styles.coinName}`}>
                                {c.name || <div className={`${styles.loader1} ${styles.loader}`}></div>}
                              </span>
                              <span className={`${styles.coinSymbol}`}>{c.symbol}</span>
                            </span>
                          </td>
                          <td className={`${styles.coinData}`}>
                            {modifyNumbers(c.current_price)} {handleSelectCurrencySymbol()}
                          </td>
                          <td
                            className={`${styles.coinData} ${
                              handleChangePrice(c.current_price, c.price_change_24h) < 0 ? styles.priceDown : ""
                            } ${handleChangePrice(c.current_price, c.price_change_24h) > 0 ? styles.priceUp : ""} ${
                              handleChangePrice(c.current_price, c.price_change_24h) === 0 ? styles.priceStatic : ""
                            }`}
                          >
                            <span className={`${styles.coinPriceArrow}`}>
                              {handleChangePrice(c.current_price, c.price_change_24h) < 0 ? <FiTrendingDown /> : ""}{" "}
                              {handleChangePrice(c.current_price, c.price_change_24h) > 0 ? <FiTrendingUp /> : ""}
                            </span>{" "}
                            {`${
                              handleChangePrice(c.current_price, c.price_change_24h) <= 0
                                ? handleChangePrice(c.current_price, c.price_change_24h) * -1
                                : ""
                            } ${
                              handleChangePrice(c.current_price, c.price_change_24h) > 0
                                ? handleChangePrice(c.current_price, c.price_change_24h)
                                : ""
                            }`}
                            %
                          </td>
                          <td className={`${styles.coinData}`}>
                            {modifyNumbers(c.market_cap)} {handleSelectCurrencySymbol()}
                          </td>
                          <td className={`${styles.coinData}`}>
                            {modifyNumbers(c.total_volume)} {handleSelectCurrencySymbol()}
                          </td>
                          <td className={`${styles.coinData}`}>
                            <button className={`${styles.coinTradeAction}`}>Trade</button>
                          </td>
                        </LazyLoad>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CoinData;
