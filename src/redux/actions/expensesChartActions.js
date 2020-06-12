import {
  LOAD_EXPENSES_CHART_REQUEST,
  LOAD_EXPENSES_CHART_SUCCESS,
  LOAD_EXPENSES_CHART_FAILED,
  ADD_CHART_EXPENSE_REQUEST,
  ADD_CHART_EXPENSE_SUCCESS,
  ADD_CHART_EXPENSE_FAILED,
  } from "./actionTypes";
  import axios from "axios";
  
  export const loadChartDataRequest = () => {
    return {
      type: LOAD_EXPENSES_CHART_REQUEST,
    };
  };
  
  export const loadChartDataSuccess = (labels, data) => {
    return {
      type: LOAD_EXPENSES_CHART_SUCCESS,
      labels,
      data,
    };
  };
  
  export const loadChartDataFailed = (error) => {
    return {
      type: LOAD_EXPENSES_CHART_FAILED,
      error,
    };
  };
  
  export const addChartDataRequest = () => {
    return {
      type: ADD_CHART_EXPENSE_REQUEST,
    };
  };
  
  export const addChartDataSuccess = (month, profit) => {
    return {
      type: ADD_CHART_EXPENSE_SUCCESS,
      month,
      profit,
    };
  };
  
  export const addChartDataFailed = (error) => {
    return {
      type: ADD_CHART_EXPENSE_FAILED,
      error,
    };
  };
  
  export const loadChartData = (token) => {
    return (dispatch) => {
      const date = new Date()
      const year = date.getFullYear()
      dispatch(loadChartDataRequest());
      axios
        .get(`https://cedx-courses.firebaseio.com/yearlyExpenses/${year}.json?auth=` + token)
        .then((response) => {
            console.log(response.data)
          const responseData = response.data;
  
          const labels = [];
          const data = [];
  
          Object.values(responseData).map((year) => {
            labels.push(year.month);
            data.push(year.expenses);
          });
          console.log(data);
          dispatch(loadChartDataSuccess(labels, data));
        })
        .catch((error) => {
          dispatch(loadChartDataFailed(error));
        });
    };
  };
  
  export const addMonthExpenseToChart = (month, newProfit, token) => {
    return (dispatch) => {
      const date = new Date()
      const year = date.getFullYear()
      console.log(month);
      axios
        .get(
          `https://cedx-courses.firebaseio.com/yearlyExpenses/${year}/${month}/expenses.json?auth=` + token
        )
        .then((response) => {
          const responseData = response.data;
          const newMonthProfit = responseData - Number(newProfit)
          console.log(responseData + Number(newProfit));
          dispatch(addChartDataRequest());
          axios
            .put(
              `https://cedx-courses.firebaseio.com/yearlyExpenses/${year}/${month}/expenses.json?auth=` + token,
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
  