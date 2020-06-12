import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false, 
      };
    case AUTH_LOGOUT:
        return {
            ...state,
            token: null,
            userId: null 
        }
    default:
      return state;
  }
};

export default authReducer;
