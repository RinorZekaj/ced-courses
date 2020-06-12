import {
  ADD_EARNING_REQUEST,
  ADD_EARNING_SUCCESS,
  ADD_EARNING_FAILED,
  LOAD_EARNINGS_REQUEST,
  LOAD_EARNINGS_SUCCESS,
  LOAD_EARNINGS_FAILED,
} from "./actionTypes";
import axios from "axios";
import moment from 'moment';

export const addEarningRequest = () => {
  return {
    type: ADD_EARNING_REQUEST,
  };
};

export const addEarningSuccess = (profit) => {
  return {
    type: ADD_EARNING_SUCCESS,
    profit,
  };
};

export const addEarningError = (error) => {
  return {
    type: ADD_EARNING_FAILED,
    error,
  };
};

export const loadEarningsRequest = () => {
  return {
    type: LOAD_EARNINGS_REQUEST,
  };
};

export const loadEarningsSuccess = (weekly, monthly, yearly) => {
  return {
    type: LOAD_EARNINGS_SUCCESS,
    weekly,
    monthly,
    yearly
  };
};

export const loadEarningsError = (error) => {
  return {
    type: LOAD_EARNINGS_FAILED,
    error,
  };
};

export const addingEarning = (profit, token) => {
  return (dispatch) => {
    const date = new Date()
    const year = date.getFullYear()
    dispatch(addEarningRequest());
    axios
      .post(`https://cedx-courses.firebaseio.com/allTimeEarnings/${year}.json?auth=` + token, profit)
      .then((response) => {
        dispatch(addEarningSuccess({ id: response.data.name, ...profit }));
      })
      .catch((error) => {
        dispatch(addEarningError(error));
      });
  };
};

export const loadingEarnings = (token) => {
  return (dispatch) => {
    const date = new Date()
    const year = date.getFullYear()
    dispatch(loadEarningsRequest());
    axios
      .get(`https://cedx-courses.firebaseio.com/allTimeEarnings/${year}.json?auth=` + token)
      .then((response) => {
        const responseData = response.data;
        const yearlyProfit = [];
        const monthlyProfit = [];
        const weeklyProfit = [];

        let newDate = new Date();
        let currentWeek = moment(newDate).format("W");
        let currentMonth = moment(newDate).format("M");
        let currentYear = moment(newDate).year()

        console.log(responseData);

        Object.entries(responseData).map((profit) => {
          if (
            moment(profit[1].date).format("W") === currentWeek &&
            moment(profit[1].date).format("M") === currentMonth &&
            moment(newDate).year() === moment(profit[1].date).year()
          ) {
            weeklyProfit.push({ id: profit[0], ...profit[1] });
            monthlyProfit.push({ id: profit[0], ...profit[1] })
            yearlyProfit.push({ id: profit[0], ...profit[1] })
          } else if (
            moment(profit[1].date).format("M") === currentMonth &&
            moment(newDate).year() === moment(profit[1].date).year()
          ) {
            monthlyProfit.push({ id: profit[0], ...profit[1] })
            yearlyProfit.push({ id: profit[0], ...profit[1] })
          } else if(moment(profit[1].date).year() === currentYear){
            yearlyProfit.push({ id: profit[0], ...profit[1] })
          } else {
            return null
          }
        });
        dispatch(loadEarningsSuccess(weeklyProfit, monthlyProfit, yearlyProfit))

        // dispatch(addWeeklyProfits(weeklyProfit))
        // dispatch(addMonthlyProfits(monthlyProfit))
        // dispatch(addYearlyProfits(yearlyProfit))
      })
      .catch(error => {
        dispatch(loadEarningsError(error))
      })
  };
};
