import React from "react";
import { connect } from "react-redux";

import classes from "./ArchiveGroupModal.module.css";
import { archiveGroup } from "../../../redux/actions/archiveActions";
import { deletingGroup } from '../../../redux/actions/groupActions'

const ArchiveGroupModal = (props) => {
   const archiveGroup = (group) => {
    props.modalClosed();
    console.log(group.id);
    console.log(group.courseId);
    return new Promise((fulfill, reject) => {
      props.archiveGroup(group.courseId, group, props.token)
      fulfill(props.deletingGroup(group.courseId, group.id, props.token))
    })
  };

  return (
    <div className={classes.archiveGroup}>
      <h2>Archive Group?</h2>
      <div>
        <button
          onClick={() => archiveGroup(props.group)}
          className={classes.buttons}
        >
          Archive
        </button>
        <button onClick={props.cancelmember} className={classes.buttons}>
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
    archiveGroup: (courseId, group, token) => dispatch(archiveGroup(courseId, group, token)),
    deletingGroup: (courseId, groupId, token) => dispatch(deletingGroup(courseId, groupId, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveGroupModal);
