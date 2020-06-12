import {
  ARCHIVE_GROUP_REQUEST,
  ARCHIVE_GROUP_SUCCESS,
  ARCHIVE_GROUP_FAILED,
  LOAD_ARCHIVED_REQUEST,
  LOAD_ARCHIVED_SUCCESS,
  LOAD_ARCHIVED_FAILED,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  archivedGroups: [],
  error: "",
};

const archivedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARCHIVED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ARCHIVED_SUCCESS:
      return {
        loading: false,
        archivedGroups: action.groups,
        error: "",
      };
    case LOAD_ARCHIVED_FAILED:
      return {
        loading: false,
        archivedGroups: [],
        error: action.error,
      };
    case ARCHIVE_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ARCHIVE_GROUP_SUCCESS:
      return {
        loading: false,
        archivedGroups: [...state.archivedGroups, action.group],
        error: "",
      };
    case ARCHIVE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default archivedReducer;
