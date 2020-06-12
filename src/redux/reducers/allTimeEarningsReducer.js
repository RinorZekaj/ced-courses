import {
  ADD_EARNING_REQUEST,
  ADD_EARNING_SUCCESS,
  ADD_EARNING_FAILED,
  LOAD_EARNINGS_SUCCESS,
  LOAD_EARNINGS_FAILED,
  LOAD_EARNINGS_REQUEST
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  allTimeEarnings: [],
  monthlyEarnings: [],
  weeklyEarnings: [],
  error: "",
};

const allTimeEarningsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EARNINGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case LOAD_EARNINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        weeklyEarnings: action.weekly,
        monthlyEarnings: action.monthly,
        allTimeEarnings: action.yearly,
        error: ''
      }
    case LOAD_EARNINGS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADD_EARNING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EARNING_SUCCESS:
      return {
        ...state,
        loading: false,
        allTimeEarnings: [...state.allTimeEarnings, action.profit],
        monthlyEarnings: [...state.monthlyEarnings, action.profit],
        weeklyEarnings: [...state.weeklyEarnings, action.profit],
        error: ''
      };
    case ADD_EARNING_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error, 
      };
    default:
      return state;
  }
};

export default allTimeEarningsReducer;