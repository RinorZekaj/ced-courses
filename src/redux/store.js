import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'

import courseReducer from "./reducers/courseReducer";
import groupsReducer from "./reducers/groupsReducer";
import archivedReducer from './reducers/archivedReducer'
import earningsChartReducer from './reducers/earningsChartReducer';
import allTimeEarningsReducer  from './reducers/allTimeEarningsReducer';
import expensesChartReducer from './reducers/expensesChartReducer'
import allTimeExpensesReducer from './reducers/allTimeExpensesReducer'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
    courses: courseReducer,
    groups: groupsReducer,
    archived: archivedReducer,
    earningsChartData: earningsChartReducer,
    allEarnings: allTimeEarningsReducer,
    expensesChartData: expensesChartReducer,
    allExpenses: allTimeExpensesReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
