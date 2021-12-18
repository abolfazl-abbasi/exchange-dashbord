import React from "react";
import styles from "./CoinData-style/Navbar.module.css";
// import Select from "react-select";

const Navbar = () => {
  return (
    <>
      <header className={`${styles.header}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.marketReport}`}>
            <h1 className={`${styles.marketReportText}`}>Market Report</h1>
            <div className={`${styles.marketReportRange}`}>
              <div className={`${styles.marketReportRangeNumber__positive}`}>+0.23%</div>
              <p className={`${styles.marketReportRangeText}`}>market up in the last 24 hours</p>

              {/* <div className={`${styles.marketReportRangeNumber__negative}`}>-0.23%</div> */}
              {/* <p className={`${styles.marketReportRangeText}`}>market down in the last 24 hours</p> */}

              {/* <div className={`${styles.marketReportRangeNumber__zero}`}>0%</div> */}
              {/* <p className={`${styles.marketReportRangeText}`}>market Stability in the last 24 hours</p> */}
            </div>
          </div>
          <div className={`${styles.inputTools}`}>
            <input className={`${styles.searchInput}`} placeholder="Search by tokens" type="search" />
            <select className={`${styles.selectCurrency}`}>
              <option value="usd" key="usd">
                USD
              </option>
              <option value="eur" key="eur">
                EUR
              </option>
              <option value="gbp" key="gbp">
                GBP
              </option>
              <option value="jpy" key="jpy">
                JPY
              </option>
            </select>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
