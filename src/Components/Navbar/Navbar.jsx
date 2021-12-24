import { Chart } from "chart.js";
import React, { useState, useEffect, useRef, createRef } from "react";
import { useCoinsContextProvider, useCoinsShowContextProvider } from "../../Providers/CoinsContextProvider";
import styles from "./Navbar-style/Navbar.module.css";
// import Select from "react-select";

const Navbar = () => {
  const { marketCapChanges, marketCapChangesState, handleSelectCurrency, selectCurrencyValue, handleSearchValue, searchValue } =
    useCoinsContextProvider();

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.marketReport}`}>
            <h1 className={`${styles.marketReportText}`}>Market Report</h1>
            <div className={`${styles.marketReportRange}`}>
              <>
                {marketCapChangesState > 0 ? (
                  <>
                    <div className={`${styles.marketReportRangeNumber__positive}`}>{marketCapChangesState}%</div>
                    <p className={`${styles.marketReportRangeText}`}>market up in the last 24 hours</p>
                  </>
                ) : (
                  ""
                )}
                {marketCapChangesState < 0 ? (
                  <>
                    <div className={`${styles.marketReportRangeNumber__negative}`}>{marketCapChangesState}%</div>
                    <p className={`${styles.marketReportRangeText}`}>market down in the last 24 hours</p>
                  </>
                ) : (
                  ""
                )}
                {marketCapChangesState === 0 ? (
                  <>
                    <div className={`${styles.marketReportRangeNumber__zero}`}>{marketCapChangesState}%</div>
                    <p className={`${styles.marketReportRangeText}`}>market Stability in the last 24 hours</p>
                  </>
                ) : (
                  ""
                )}
              </>
            </div>
          </div>
          <div className={`${styles.inputTools}`}>
            <input
              className={`${styles.searchInput}`}
              placeholder="Search by tokens"
              type="search"
              onChange={(e) => handleSearchValue(e.target.value)}
              value={searchValue}
            />
            <select
              value={selectCurrencyValue}
              className={`${styles.selectCurrency}`}
              onChange={(e) => handleSelectCurrency(e.target.value)}
            >
              <option value="usd" key="usd">
                $ USD
              </option>
              <option value="eur" key="eur">
                € EUR
              </option>
              <option value="gbp" key="gbp">
                £ GBP
              </option>
              <option value="jpy" key="jpy">
                ¥ JPY
              </option>
              <option value="try" key="try">
                ₺ TRY
              </option>
              <option value="inr" key="inr">
                ₹ INR
              </option>
              <option value="cny" key="cny">
                ¥ CNY
              </option>
              <option value="krw" key="krw">
                ₩ KRW
              </option>
              <option value="sek" key="sek">
                kr SEK
              </option>
              <option value="aud" key="aud">
                A$ AUD
              </option>
            </select>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
