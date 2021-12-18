import React from "react";
import styles from "./CoinData-style/CoinData.module.css";

const CoinData = ({ name, price, id }) => {
  return (
    <>
      <div className={`${styles.coinContainer}`}>
        <div>{name}</div>
        <div>{price}</div>
      </div>
    </>
  );
};

export default CoinData;
