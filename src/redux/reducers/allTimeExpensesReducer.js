import {
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILED,
  LOAD_EXPENSES_REQUEST,
  LOAD_EXPENSES_SUCCESS,
  LOAD_EXPENSES_FAILED
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  allTimeExpenses: [],
  monthlyExpenses: [],
  weeklyExpenses: [],
  error: "",
};

const allTimeExpensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPENSES_REQUEST: 
      return {
        ...state,
        loading: true
    }
    case LOAD_EXPENSES_SUCCESS:
      return {
        ...state,
        weeklyExpenses: action.weekly,
        monthlyExpenses: action.monthly,
        allTimeExpenses: action.yearly,
        loading: false
      }
    case LOAD_EXPENSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case ADD_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        allTimeExpenses: [...state.allTimeExpenses, action.expense],
        monthlyExpenses: [...state.monthlyExpenses, action.expense],
        weeklyExpenses: [...state.weeklyExpenses, action.expense],
      };
    case ADD_EXPENSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default allTimeExpensesReducer;