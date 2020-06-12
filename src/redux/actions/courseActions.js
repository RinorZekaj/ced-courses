import axios from "axios";
import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILED,
  LOAD_COURSES_REQUEST,
  LOAD_COURSES_SUCCESS,
  LOAD_COURSES_FAILED,
} from "./actionTypes";

//LOAD COURSES

export const loadCoursesRequest = () => {
  return { type: LOAD_COURSES_REQUEST };
};

export const loadCoursesSuccess = (courses) => {
  return { type: LOAD_COURSES_SUCCESS, courses };
};

export const loadCoursesFailed = (error) => {
  return { type: LOAD_COURSES_FAILED, error };
};

//ADD COURSE

export const addCourseRequest = () => {
  return { type: ADD_COURSE_REQUEST };
};

export const addCourseSuccess = (course) => {
  return { type: ADD_COURSE_SUCCESS, course: course };
};

export const addCourseFailed = (error) => {
  return { type: ADD_COURSE_FAILED, error };
};

export const addingCourse = (course, token) => {
  return (dispatch) => {
    dispatch(addCourseRequest());
    axios
      .post("https://cedx-courses.firebaseio.com/courses.json?auth=" + token, course)
      .then((response) => {
        dispatch(addCourseSuccess({ id: response.data.name, ...course }));
      })
      .catch((error) => {
        dispatch(addCourseFailed(error));
      });
  };
};

export const loadCourses = () => {
  return (dispatch) => {
    dispatch(loadCoursesRequest());
    axios
      .get('https://cedx-courses.firebaseio.com/courses.json')
      .then((response) => {
        const courses = response.data;
        Object.entries(courses).map(course => {
          dispatch(loadCoursesSuccess({id: course[0], ...course[1]}));
        })
      })
      .catch((error) => {
        dispatch(loadCoursesFailed(error));
      });
  };
};
