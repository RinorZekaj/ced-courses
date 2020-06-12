import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILED,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILED,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  courses: [],
  error: "",
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_COURSES_SUCCESS:
      return {
        loading: false,
        courses: [ ...state.courses, action.courses],
        error: "",
      };
    case LOAD_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_COURSE_SUCCESS:
      return {
        loading: false,
        courses: [...state.courses, action.course],
        error: "",
      };
    case ADD_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default courseReducer;
