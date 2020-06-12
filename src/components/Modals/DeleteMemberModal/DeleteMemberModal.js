import React from "react";

import classes from "./DeleteMemberModal.module.css";

const DeleteMemberModal = (props) => {
  return (
    <div className={classes.deleteMember}>
      <h2>Delete Member?</h2>
      <div>
        <button onClick={props.deletemember} className={classes.buttons}>
          Delete
        </button>
        <button onClick={props.cancelmember} className={classes.buttons}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
