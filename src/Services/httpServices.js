import axios from "axios";

// axios.defaults.baseURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1";

axios.interceptors.response.use(
  (res) => {
    // console.log(res.status);
    return res;
  },
  (err) => {
    console.log(err);
  }
);
