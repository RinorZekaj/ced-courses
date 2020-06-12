import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./GroupTable.module.css";
import Archived from "../../assets/add.png";
import TableRow from "../TableRow/TableRow";
import Modal from "../UI/Modal/Modal";
import AddMemberModal from "../Modals/AddMemberModal/AddMemberModal";
import DeleteMemberModal from "../Modals/DeleteMemberModal/DeleteMemberModal";
import { deletingGroupMember } from "../../redux/actions/groupActions";
import ArchiveGroupModal from "../Modals/ArchiveGroupModal/ArchiveGroupModal";

function GroupTable(props) {
  const [addingMemberModal, setAddingMemberModal] = useState(false);
  const [deletingMember, setDeletingMember] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState("");
  const [archivingGroup, setArchivingGroup] = useState(false);

  const duration = props.group.duration;

  const months = [];
  let colSpan = 2;
  const totals = [];

  const deletingMemberHandler = (studentId) => {
    setDeleteStudentId(studentId);
    setDeletingMember(true);
    console.log(deleteStudentId);
    console.log(props.groupId);
  };

  const deleteMemberHandler = () => {
    console.log(deleteStudentId);
    setDeletingMember(false);
    props.deletingGroupMember(
      props.group.courseId,
      props.groupId,
      deleteStudentId,
      props.token
    );
  };

  for (let i = 1; i <= duration; i++) {
    colSpan = colSpan + 1;
    months.push(
      <th className={classes.tableHeader} key={i}>
        MONTH-{i}
      </th>
    );
  }

  for (let i = 1; i <= duration; i++) {
    let total = 0;
    props.group.students &&
      Object.values(props.group.students).map((student) => {
        total = total + Number(student["month" + i]);
      });
    totals.push(
      <td className={classes.tableData} key={i}>
        {total}
      </td>
    );
    total = 0;
  }

  return (
    <div className={classes.tableWrapper}>
      <Modal
        show={addingMemberModal}
        modalClosed={() => setAddingMemberModal(false)}
      >
        <AddMemberModal
          courseDuration={duration}
          courseId={props.group.courseId}
          groupId={props.group.id}
          closeModal={() => setAddingMemberModal(false)}
        />
      </Modal>
      <Modal
        show={deletingMember}
        modalClosed={() => setDeletingMember(false)}
        top="35%"
      >
        <DeleteMemberModal
          cancelmember={() => setDeletingMember(false)}
          deletemember={() => deleteMemberHandler()}
        />
      </Modal>
      <Modal
        show={archivingGroup}
        modalClosed={() => setArchivingGroup(false)}
        top="35%"
      >
        <ArchiveGroupModal
          group={props.group}
          modalClosed={() => setArchivingGroup(false)}
        />
      </Modal>

      <table className={classes.table} cellSpacing="0">
        <thead>
          <tr className={classes.groupRow}>
            <th className={classes.groupColumn} colSpan={colSpan}>
              Group - {props.groupIndex + 1}
            </th>
            {props.archived ? null : <th
              className={classes.archived}
              onClick={() => setArchivingGroup(true)}
            >
              <p>ARCHIVE</p>
              <img src={Archived} />
            </th>}
          </tr>
          <tr className={classes.tableHeaderRow}>
            <th className={classes.tableHeader}>NAME</th>
            <th className={classes.tableHeader}>SURNAME</th>
            {months}
            {props.archived ? null : (
              <th className={classes.addMemberCell}>
                <button
                  className={classes.addMemberButton}
                  onClick={() => setAddingMemberModal(true)}
                >
                  + ADD MEMBER
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.group.students &&
            Object.entries(props.group.students).map((student, index) => (
              <TableRow
                studentId={student[0]}
                student={student[1]}
                groupId={props.groupId}
                courseId={props.group.courseId}
                key={`${props.groupId}+${duration}+${Object.entries(props.group.students).length}+${index}`}
                deletingMemeber={(id) => deletingMemberHandler(id)}
                archived={props.archived}
              />
            ))}
          <tr>
            <td className={classes.totali} colSpan="2">
              TOTALI
            </td>
            {totals}
            {props.archived ? null : <td className={classes.tableData}></td>}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deletingGroupMember: (courseId, groupId, memberId, token) =>
      dispatch(deletingGroupMember(courseId, groupId, memberId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupTable);
