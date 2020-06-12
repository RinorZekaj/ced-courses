import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./AddGroupModal.module.css";
import { addingGroup, loadGroups } from "../../../redux/actions/groupActions";

function AddGroupModal(props) {
  const [courseGroup, setCourseGroup] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(0);
  const [courseDuration, setCourseDuration] = useState(0);
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    var option = optionElement.getAttribute("id");
    setCourseGroup(option);
  };

  const addGroupHandler = () => {
    if(courseGroup !== "" && numberOfMembers !== 0 && courseDuration !== 0){
      props.closeModal();
      let member = { emri: "Name", mbiemri: "Surname", id: 0 };
      for (let i = 1; i <= courseDuration; i++) {
        member["month" + i] = 0;
      }
  
      const students = [];
      for (let i = 1; i <= numberOfMembers; i++) {
        students.push({ ...member, id: i - 1 });
      }
  
      const group = {
        courseId: courseGroup,
        duration: courseDuration,
        students: students,
      };
      props.addGroup(courseGroup, group, props.token);
      setError(false)
    } else {
      setError(true)
    }
  };

  return (
    <div className={classes.addGroup}>
      <h2>Course</h2>
      <select onChange={(e) => handleChange(e)}>
        <option value="" defaultValue hidden="hidden">
          Choose here
        </option>

        {props.courses &&
          props.courses.map((course) => (
            <option key={course.name} id={course.id}>
              {course.name}
            </option>
          ))}
      </select>
      <h2>Number of members</h2>
      <input
        placeholder="Enter number of members"
        type="number"
        value={numberOfMembers}
        onChange={(e) => setNumberOfMembers(e.target.value)}
      ></input>
      <h2>Duration</h2>
      <input
        placeholder="Enter number of months"
        type="number"
        value={courseDuration}
        onChange={(e) => setCourseDuration(e.target.value)}
      ></input>
      {error ? <p>Please fill out the fields to add group.</p> : null} 
      <button onClick={() => addGroupHandler()}>Add</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGroup: (id, group, token) => dispatch(addingGroup(id, group, token)),
    loadGroups: (id) => dispatch(loadGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupModal);
