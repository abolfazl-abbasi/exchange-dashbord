import React, { useState, useEffect } from "react";
import { useCoinsContextProvider, useCoinsShowContext } from "../../Providers/CoinsContextProvider";
import styles from "./CoinData-style/CoinData.module.css";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

const CoinData = () => {
  const { coinsData, handleChangePrice, marketCapChanges, modifyNumbers } = useCoinsContextProvider();

  const coinsDataShow = useCoinsShowContext();

  return (
    <>
      <section className={`${styles.coinsData}`}>
        <div className={`${styles.coinsMainContainer}`}>
          <table className={`${styles.coinTable}`}>
            <thead onClick={marketCapChanges}>
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
              {coinsData.length === 0 ? (
                <tr className={`${styles.coinContainer}`}>
                  <td className={`${styles.coinData}`}>Loading...</td>
                </tr>
              ) : (
                coinsDataShow.map((c) => {
                  return (
                    <tr className={`${styles.coinContainer}`} key={c.id}>
                      {/* {getSum(handleChangePrice(c.current_price, c.price_change_24h), 0)} */}
                      <td className={`${styles.coinData}`}>{c.market_cap_rank}</td>
                      <td className={`${styles.coinData} ${styles.coinNameData}`}>
                        <img src={c.image} alt="" className={`${styles.coinImage}`} />
                        <span>
                          <span className={`${styles.coinName}`}>{c.name}</span>
                          <span className={`${styles.coinSymbol}`}>{c.symbol}</span>
                        </span>
                      </td>
                      <td className={`${styles.coinData}`}>{modifyNumbers(c.current_price)}</td>
                      <td
                        className={`${styles.coinData} ${
                          handleChangePrice(c.current_price, c.price_change_24h) < 0 ? styles.priceDown : ""
                        } ${handleChangePrice(c.current_price, c.price_change_24h) > 0 ? styles.priceUp : ""} ${
                          handleChangePrice(c.current_price, c.price_change_24h) == 0 ? styles.priceStatic : ""
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
                      <td className={`${styles.coinData}`}>{modifyNumbers(c.market_cap)}</td>
                      <td className={`${styles.coinData}`}>{modifyNumbers(c.total_volume)}</td>
                      <td className={`${styles.coinData}`}>
                        <button className={`${styles.coinTradeAction}`}>Trade</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CoinData;
