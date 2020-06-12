import {
  LOAD_EXPENSES_CHART_REQUEST,
  LOAD_EXPENSES_CHART_SUCCESS,
  LOAD_EXPENSES_CHART_FAILED,
  ADD_CHART_EXPENSE_REQUEST,
  ADD_CHART_EXPENSE_SUCCESS,
  ADD_CHART_EXPENSE_FAILED,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  labels: [],
  error: "",
};

const earningsChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSES_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_EXPENSES_CHART_SUCCESS:
      return {
        ...state,
        data: action.data,
        labels: action.labels,
        loading: false,
      };
    case LOAD_EXPENSES_CHART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_CHART_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CHART_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((monthProfit, index) => {
          return action.month === index ? action.profit : monthProfit;
        }),
      };
    case ADD_CHART_EXPENSE_FAILED:
      return{
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default earningsChartReducer;
