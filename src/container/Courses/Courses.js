import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import Modal from "../../components/UI/Modal/Modal";
import AddCourseModal from "../../components/Modals/AddCourseModal/AddCourseModal";
import classes from "./Courses.module.css";
import { loadCourses } from "../../redux/actions/courseActions";
import AddGroupModal from "../../components/Modals/AddGroupModal/AddGroupModal";
import { loadGroups } from "../../redux/actions/groupActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import GroupTable from "../../components/GroupTable/GroupTable";

const Courses = (props) => {
  const { courses, groups, loadCourses, loadGroups } = props;

  const [addingCourseModal, setAddingCourseModal] = useState(false);
  const [addingGroupModal, setAddingGroupModal] = useState(false);
  const [loadGroupsID, setLoadGroupsID] = useState("-M5OTPtrw5Bg15JNM6Lj");

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses();
    }
    loadGroups(loadGroupsID);
  }, [loadGroupsID]);

  return (
    <div
      className={classes.container}
      style={{
        height: props.groups && props.groups.length > 0 ? "auto" : "100vh",
      }}
    >
      {/* Modals */}
      <Modal
        show={addingCourseModal}
        modalClosed={() => setAddingCourseModal(false)}
      >
        <AddCourseModal closeModal={() => setAddingCourseModal(false)} />
      </Modal>
      <Modal
        show={addingGroupModal}
        modalClosed={() => setAddingGroupModal(false)}
        top="20%"
      >
        <AddGroupModal closeModal={() => setAddingGroupModal(false)} />
      </Modal>

      <Layout
        height={props.groups && props.groups.length > 0 ? "auto" : "100vh"}
      >
        {/* COURSE CONTAINER */}

        <h1 className={classes.title}>Courses</h1>
        <div className={classes.courseContainer}>
          <div className={classes.courseButtons}>
            {courses &&
              courses.map((course) => (
                <button
                  id={course.id}
                  className={classes.courseButton}
                  onClick={(e) => setLoadGroupsID(e.target.id)}
                  key={course.name}
                >
                  {course.name}
                </button>
              ))}
          </div>
          {props.loadingCourses ? <Spinner /> : null}
          {props.isAuth ? (
            <button
              onClick={() => setAddingCourseModal(true)}
              className={classes.addCourseButton}
            >
              + ADD COURSE
            </button>
          ) : null}
        </div>
        <hr />

        {/* GROUP CONTAINER */}
        <div className={classes.groupsContainer}>
          {props.isAuth ? (
            <button
              className={classes.addGroupButton}
              onClick={() => setAddingGroupModal(true)}
            >
              + ADD GROUP
            </button>
          ) : null}
          {props.groupsError ? <p>There are no available groups.</p> : null}
          {props.loadingGroups ? <Spinner size="7" /> : null}
          {groups.length > 0
            ? groups.map((group, index) => (
                <GroupTable
                  groupIndex={index}
                  groupId={group.id}
                  group={group}
                  key={group.id}
                  archived={!props.isAuth}
                />
              ))
            : null}
        </div>
      </Layout>
    </div>
  );
};

// Courses.propTypes = {
//   courses: PropTypes.object.isRequired,
//   groups: PropTypes.object.isRequired,
//   loadCourses: PropTypes.func.isRequired,
//   loadGroups: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
    loadingCourses: state.courses.loading,
    groups: state.groups.groups,
    groupsError: state.groups.error,
    loadingGroups: state.groups.loading,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourses: () => dispatch(loadCourses()),
    loadGroups: (id) => dispatch(loadGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
