import {
  ARCHIVE_GROUP_REQUEST,
  ARCHIVE_GROUP_SUCCESS,
  ARCHIVE_GROUP_FAILED,
  LOAD_ARCHIVED_REQUEST,
  LOAD_ARCHIVED_SUCCESS,
  LOAD_ARCHIVED_FAILED,
} from "./actionTypes";
import axios from "axios";

export const archiveGroupRequest = () => {
  return {
    type: ARCHIVE_GROUP_REQUEST,
  };
};

export const archiveGroupSuccess = (group) => {
  return {
    type: ARCHIVE_GROUP_SUCCESS,
    group,
  };
};

export const archiveGroupFailed = (error) => {
  return {
    type: ARCHIVE_GROUP_FAILED,
    error,
  };
};

export const loadArchivedRequest = () => {
  return {
    type: LOAD_ARCHIVED_REQUEST,
  };
};

export const loadArchivedSuccess = (groups) => {
  return {
    type: LOAD_ARCHIVED_SUCCESS,
    groups,
  };
};

export const loadArchivedFailed = (error) => {
  return {
    type: LOAD_ARCHIVED_FAILED,
    error,
  };
};

export const loadArchivedGroups = (courseId) => {
  return (dispatch) => {
    dispatch(loadArchivedRequest());
    axios
      .get(
        `https://cedx-courses.firebaseio.com/courses/${courseId}/archived.json`
      )
      .then((response) => {
        const ArchivedArray = [];
        const groups = response.data;
        Object.entries(groups).map((group) => {
          // dispatch(loadGroupsSuccess({ id: group[0], ...group[1] }));
          ArchivedArray.push(group[1]);
        });
        dispatch(loadArchivedSuccess(ArchivedArray));
      })
      .catch((error) => {
        dispatch(loadArchivedFailed(error));
      });
  };
};

export const archiveGroup = (courseId, group, token) => {
  return (dispatch) => {
    dispatch(archiveGroupRequest());
    axios
      .post(
        `https://cedx-courses.firebaseio.com/courses/${courseId}/archived.json?auth=` + token,
        group
      )
      .then((response) => {
        dispatch(archiveGroupSuccess(group));
      })
      .catch((error) => {
        dispatch(archiveGroupFailed(error));
      });
  };
};
