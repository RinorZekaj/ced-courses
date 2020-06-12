import {
  LOAD_EARNINGS_CHART_REQUEST,
  LOAD_EARNINGS_CHART_SUCCESS,
  LOAD_EARNINGS_CHART_FAILED,
  ADD_CHART_EARNING_REQUEST,
  ADD_CHART_EARNING_SUCCESS,
  ADD_CHART_EARNING_FAILED,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  labels: [],
  error: "",
};

const earningsChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EARNINGS_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_EARNINGS_CHART_SUCCESS:
      return {
        ...state,
        data: action.data,
        labels: action.labels,
        loading: false
      };
    case LOAD_EARNINGS_CHART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_CHART_EARNING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CHART_EARNING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((monthProfit, index) => {
          return (
            action.month === index ? action.profit : monthProfit
          )
        })
      };
    case ADD_CHART_EARNING_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default earningsChartReducer;
