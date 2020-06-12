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
} from "./actionTypes";
import axios from "axios";

export const loadGroupsRequest = () => {
  return {
    type: LOAD_GROUPS_REQUEST,
  };
};

export const loadGroupsSuccess = (groups) => {
  return {
    type: LOAD_GROUPS_SUCCESS,
    groups,
  };
};

export const loadGroupsFailed = (error) => {
  return {
    type: LOAD_GROUPS_FAILED,
    error,
  };
};

export const addGroupRequest = () => {
  return {
    type: ADD_GROUP_REQUEST,
  };
};

export const addGroupSuccess = (group) => {
  return {
    type: ADD_GROUP_SUCCESS,
    group,
  };
};

export const addGroupFailed = (error) => {
  return {
    type: ADD_GROUP_FAILED,
    error,
  };
};

export const addGroupMember = (groupId, id, member) => {
  return {
    type: ADD_GROUP_MEMBER,
    groupId,
    member,
    id,
  };
};

export const deleteGroupMember = (groupId, memberId, key, value) => {
  return {
    type: DELETE_GROUP_MEMBER,
    groupId,
    memberId,
    key,
    value,
  };
};

export const changeGroupMember = (groupId, memberId, data) => {
  return {
    type: CHANGE_GROUP_MEMBER,
    groupId,
    memberId,
    data,
  };
};

export const deleteGroupRequest = () => {
  return {
    type: DELETE_GROUP_REQUEST,
  };
};

export const deleteGroupSuccess = (groupId) => {
  return {
    type: DELETE_GROUP_SUCCESS,
    groupId,
  };
};

export const deleteGroupFailed = (error) => {
  return {
    type: DELETE_GROUP_FAILED,
    error,
  };
};

export const loadGroups = (id) => {
  return (dispatch) => {
    dispatch(loadGroupsRequest());
    axios
      .get(`https://cedx-courses.firebaseio.com/courses/${id}/groups.json`)
      .then((response) => {
        const groupsArray = [];
        const groups = response.data;
        Object.entries(groups).map((group) => {
          // console.log(group);
          // dispatch(loadGroupsSuccess({ id: group[0], ...group[1] }));
          groupsArray.push({ id: group[0], ...group[1] });
        });
        dispatch(loadGroupsSuccess(groupsArray));
      })
      .catch((error) => {
        dispatch(loadGroupsFailed(error));
        console.log(error);
      });
  };
};

export const addingGroup = (id, group, token) => {
  return (dispatch) => {
    dispatch(addGroupRequest());
    axios
      .post(
        `https://cedx-courses.firebaseio.com/courses/${id}/groups.json?auth=` +
          token,
        group
      )
      .then((response) => {
        dispatch(addGroupSuccess({ id: response.data.name, ...group }));
      })
      .catch((error) => {
        dispatch(addGroupFailed(error));
      });
  };
};

export const addingGroupMember = (courseId, groupId, member, token) => {
  return (dispatch) => {
    console.log(token)
    axios
      .post(
        `https://cedx-courses.firebaseio.com/courses/${courseId}/groups/${groupId}/students.json?auth=` +
          token,
        member
      )
      .then((response) => {
        // const student = { id: response.data.name, ...member }
        dispatch(addGroupMember(groupId, response.data.name, member));
      });
  };
};

export const deletingGroupMember = (courseId, groupId, memberId, token) => {
  return (dispatch) => {
    axios
      .delete(
        `https://cedx-courses.firebaseio.com/courses/${courseId}/groups/${groupId}/students/${memberId}.json?auth=` +
          token
      )
      .then((response) => {
        dispatch(deleteGroupMember(groupId, memberId));
      });
  };
};

export const changingGroupMember = (
  courseId,
  groupId,
  memberId,
  data,
  token
) => {
  return (dispatch) => {
    dispatch(changeGroupMember(groupId, memberId, data));
    axios({
      method: "put",
      url:
        `https://cedx-courses.firebaseio.com/courses/${courseId}/groups/${groupId}/students/${memberId}.json?auth=` +
        token,
      data: data,
      config: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    }).then((response) => {
      // console.log("working")
    });
  };
};

export const deletingGroup = (courseId, groupId, token) => {
  return (dispatch) => {
    dispatch(deleteGroupRequest());
    axios
      .delete(
        `https://cedx-courses.firebaseio.com/courses/${courseId}/groups/${groupId}.json?auth=` + token
      )
      .then((response) => {
        dispatch(deleteGroupSuccess(groupId));
      })
      .catch((error) => {
        dispatch(deleteGroupFailed(error));
      });
  };
};
