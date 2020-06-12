import React from "react";
import { connect } from 'react-redux'

import classes from "./TableCell.module.css";
import { changingGroupMember } from "../../redux/actions/groupActions";

function TableCell(props) {

  const changeMember = (key, value) => {
    console.log(key, value);
    const updateStudent = {...props.student, [key]: value}
    props.changeMember(props.courseId, props.groupId, props.studentId, updateStudent, props.token)
  };

  return (
    <input
      className={classes.input}
      value={props.value}
      onChange={(e) => changeMember(props.memberKey, e.target.value)}
      type="text"
      disabled={props.archived ? true : false}
      name={props.name}
      key={props.keys}
    ></input>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeMember: (courseId, groupId, memberId, data, token) =>
      dispatch(changingGroupMember(courseId, groupId, memberId, data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);
