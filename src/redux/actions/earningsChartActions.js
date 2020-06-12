import {
  LOAD_EARNINGS_CHART_REQUEST,
  LOAD_EARNINGS_CHART_SUCCESS,
  LOAD_EARNINGS_CHART_FAILED,
  ADD_CHART_EARNING_REQUEST,
  ADD_CHART_EARNING_SUCCESS,
  ADD_CHART_EARNING_FAILED,
} from "./actionTypes";
import axios from "axios";

export const loadChartDataRequest = () => {
  return {
    type: LOAD_EARNINGS_CHART_REQUEST,
  };
};

export const loadChartDataSuccess = (labels, data) => {
  return {
    type: LOAD_EARNINGS_CHART_SUCCESS,
    labels,
    data,
  };
};

export const loadChartDataFailed = (error) => {
  return {
    type: LOAD_EARNINGS_CHART_FAILED,
    error,
  };
};

export const addChartDataRequest = () => {
  return {
    type: ADD_CHART_EARNING_REQUEST,
  };
};

export const addChartDataSuccess = (month, profit) => {
  return {
    type: ADD_CHART_EARNING_SUCCESS,
    month,
    profit,
  };
};

export const addChartDataFailed = (error) => {
  return {
    type: ADD_CHART_EARNING_FAILED,
    error,
  };
};

export const loadChartData = (token) => {
  return (dispatch) => {
    const date = new Date()
    const year = date.getFullYear()
    dispatch(loadChartDataRequest());
    axios
      .get(`https://cedx-courses.firebaseio.com/yearlyProfit/${year}.json?auth=` + token)
      .then((response) => {
        const responseData = response.data;

        const labels = [];
        const data = [];

        Object.values(responseData).map((year) => {
          labels.push(year.month);
          data.push(year.profit);
        });
        console.log(data);
        dispatch(loadChartDataSuccess(labels, data));
      })
      .catch((error) => {
        dispatch(loadChartDataFailed(error));
      });
  };
};

export const addMonthProfitToChart = (month, newProfit, token) => {
  return (dispatch) => {
    const date = new Date()
    const year = date.getFullYear()
    console.log(month);
    axios
      .get(
        `https://cedx-courses.firebaseio.com/yearlyProfit/${year}/${month}/profit.json?auth=` + token
      )
      .then((response) => {
        const responseData = response.data;
        const newMonthProfit = responseData + Number(newProfit);
        console.log(responseData + Number(newProfit));
        dispatch(addChartDataRequest());
        axios
          .put(
            `https://cedx-courses.firebaseio.com/yearlyProfit/${year}/${month}/profit.json?auth=` + token,
            newMonthProfit
          )
          .then((response) => {
            dispatch(addChartDataSuccess(month, newMonthProfit));
          })
          .catch((error) => {
            dispatch(addChartDataFailed(error));
          });
      })
      .catch((error) => {
        dispatch(addChartDataFailed(error));
        console.log("error");
      });
  };
};
