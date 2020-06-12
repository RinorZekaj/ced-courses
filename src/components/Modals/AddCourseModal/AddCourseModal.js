import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./AddCourseModal.module.css";
import { addingCourse } from "../../../redux/actions/courseActions";

const AddCourse = (props) => {
  const [newCourse, setNewCourse] = useState({ name: "", groups: [] });
  const [error, setError] = useState(false);

  const addCourseHandler = () => {
    if (newCourse.name !== "") {
      props.addingCourse(newCourse, props.token);
      props.closeModal();
      setNewCourse({ name: "", groups: [] });
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className={classes.addCourse}>
      <h2>Add Course</h2>
      <input
        placeholder="Course Name"
        value={newCourse.name}
        onChange={(event) =>
          setNewCourse({ name: event.target.value, groups: {} })
        }
      />
      {error ? <p>Please fill out the field to add course.</p> : null} 
      <button onClick={() => addCourseHandler()}>Add</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addingCourse: (course, token) => dispatch(addingCourse(course, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);
