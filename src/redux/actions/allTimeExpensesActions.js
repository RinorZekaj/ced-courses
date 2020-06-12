import {
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILED,
  LOAD_EXPENSES_REQUEST,
  LOAD_EXPENSES_SUCCESS,
  LOAD_EXPENSES_FAILED,
} from "./actionTypes";
import axios from "axios";
import moment from "moment";

export const addExpenseRequest = () => {
  return {
    type: ADD_EXPENSE_REQUEST,
  };
};

export const addExpenseSuccess = (expense) => {
  return {
    type: ADD_EXPENSE_SUCCESS,
    expense,
  };
};

export const addExpenseFailed = (error) => {
  return {
    type: ADD_EXPENSE_FAILED,
    error,
  };
};

export const loadExpensesRequest = () => {
  return {
    type: LOAD_EXPENSES_REQUEST,
  };
};

export const loadExpensesSuccess = (weekly, monthly, yearly) => {
  return {
    type: LOAD_EXPENSES_SUCCESS,
    weekly,
    monthly,
    yearly,
  };
};

export const loadExpensesFailed = (error) => {
  return {
    type: LOAD_EXPENSES_FAILED,
    error,
  };
};

export const addingExpense = (expense, token) => {
  return (dispatch) => {
    const date = new Date();
    const year = date.getFullYear();
    dispatch(addExpenseRequest());
    axios
      .post(
        `https://cedx-courses.firebaseio.com/allTimeExpenses/${year}.json?auth=` +
          token,
        expense
      )
      .then((response) => {
        dispatch(addExpenseSuccess({ id: response.data.name, ...expense }));
      })
      .catch((error) => {
        dispatch(addExpenseFailed(error));
      });
  };
};

export const loadExpenses = (token) => {
  return (dispatch) => {
    const date = new Date();
    const year = date.getFullYear();
    dispatch(loadExpensesRequest());
    axios
      .get(`https://cedx-courses.firebaseio.com/allTimeExpenses/${year}.json?auth=` + token)
      .then((response) => {
        const responseData = response.data;
        const yearlyExpenses = [];
        const monthlyExpenses = [];
        const weeklyExpenses = [];

        let newDate = new Date();
        let currentWeek = moment(newDate).format("w");
        let currentMonth = moment(newDate).format("M");
        let currentYear = moment(newDate).year();

        Object.entries(responseData).map((expense) => {
          if (
            moment(expense[1].date).format("W") === currentWeek &&
            moment(expense[1].date).format("M") === currentMonth &&
            moment(newDate).year() === moment(expense[1].date).year()
          ) {
            weeklyExpenses.push({ id: expense[0], ...expense[1] });
            monthlyExpenses.push({ id: expense[0], ...expense[1] });
            yearlyExpenses.push({ id: expense[0], ...expense[1] });
          } else if (
            moment(expense[1].date).format("M") === currentMonth &&
            moment(newDate).year() === moment(expense[1].date).year()
          ) {
            monthlyExpenses.push({ id: expense[0], ...expense[1] });
            yearlyExpenses.push({ id: expense[0], ...expense[1] });
          } else if (moment(expense[1].date).year() === currentYear) {
            yearlyExpenses.push({ id: expense[0], ...expense[1] });
          } else {
            return null;
          }
        });
        dispatch(
          loadExpensesSuccess(weeklyExpenses, monthlyExpenses, yearlyExpenses)
        );
      })
      .catch((error) => {
        dispatch(loadExpensesFailed(error));
      });
  };
};
