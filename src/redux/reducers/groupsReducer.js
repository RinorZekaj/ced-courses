import {
  ADD_GROUP_REQUEST,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILED,
  LOAD_GROUPS_REQUEST,
  LOAD_GROUPS_SUCCESS,
  LOAD_GROUPS_FAILED,
  ADD_GROUP_MEMBER,
  DELETE_GROUP_MEMBER,
  CHANGE_GROUP_MEMBER,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILED,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  groups: [],
  error: "",
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GROUPS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_GROUPS_SUCCESS:
      return {
        loading: false,
        groups: [...action.groups],
        error: "",
      };
    case LOAD_GROUPS_FAILED:
      return {
        loading: false,
        groups: [],
        error: action.error,
      };
    case ADD_GROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_GROUP_SUCCESS:
      return {
        loading: false,
        groups: [...state.groups, action.group],
        error: "",
      };
    case ADD_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_GROUP_MEMBER:
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.groupId) {
            const newGroup = {
              ...group,
              students: (group.students = {
                ...group.students,
                [action.id]: action.member,
              }),
            };
            return newGroup;
          } else {
            return group;
          }
        }),
      };
    case DELETE_GROUP_MEMBER:
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.groupId) {
            const newStudents = {};
            Object.entries(group.students).map((member) => {
              if (member[0] !== action.memberId) {
                newStudents[member[0]] = member[1];
              } else {
                return null;
              }
            });
            const newGroup = {
              ...group,
              students: { ...newStudents },
            };
            return newGroup;
          } else {
            return group;
          }
        }),
      };
    case CHANGE_GROUP_MEMBER:
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.groupId) {
            return {...group, students: {...group.students, [action.memberId]: {...action.data}}}
          } else {
            return group;
          }
        }),
      };
    case DELETE_GROUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_GROUP_SUCCESS:
      return {
        loading: false,
        groups: state.groups.filter(group => group.id !== action.groupId),
        error: ''
      }
    case DELETE_GROUP_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default groupsReducer;
