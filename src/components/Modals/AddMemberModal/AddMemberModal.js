import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./AddMemberModal.module.css";
import { addingGroupMember } from "../../../redux/actions/groupActions";

const AddMember = (props) => {
  const [memberName, setMemberName] = useState("");
  const [memberSurName, setMemberSurName] = useState("");
  const [error, setError] = useState(false)

  const addMemberHandler = () => {
    if(memberName !== "" && memberSurName !== ""){
      let member = {emri: memberName, mbiemri: memberSurName}
      for (let i = 1; i <= props.courseDuration; i++) {
        member["month" + i] = 0;
      }
      console.log(memberName, memberSurName);
      props.closeModal();
      props.addingMember(props.courseId, props.groupId, member, props.token)
      setError(false)
    } else {
      setError(true)
    }
  };

  return (
    <div className={classes.addMember}>
      <h2>Add Member</h2>
      <input
        type="text"
        placeholder="Name"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Surname"
        value={memberSurName}
        onChange={(e) => setMemberSurName(e.target.value)}
      />
      {error ? <p>Please fill out the fields to add group.</p> : null} 
      <div>
        <button onClick={() => addMemberHandler()} className={classes.buttons}>
          Add
        </button>
        <button onClick={props.closeModal} className={classes.buttons}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addingMember: (courseId, groupId, member, token) =>
      dispatch(addingGroupMember(courseId, groupId, member, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
