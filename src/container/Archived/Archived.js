import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import classes from "./Archived.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadArchivedGroups } from "../../redux/actions/archiveActions";
import GroupTable from "../../components/GroupTable/GroupTable";

function Archived(props) {
  const [loadArchivedGroupsID, setLoadArchivedGroupsID] = useState(
    "-M5OTPtrw5Bg15JNM6Lj"
  );

  useEffect(() => {
    if (props.courses.length === 0) {
      props.loadCourses();
    }
    props.loadArchivedGroups(loadArchivedGroupsID);
  }, [loadArchivedGroupsID]);

  return (
    <div
      className={classes.container}
      style={{
        height: props.archivedGroups && props.archivedGroups.length > 0 ? "auto" : "100vh",
      }}
    >
      <Layout
        height={
          props.archivedGroups && props.archivedGroups.length > 0
            ? "auto"
            : "100vh"
        }
      >
        <h1 className={classes.title}>Archived</h1>
        <div className={classes.courseContainer}>
          <div className={classes.courseButtons}>
            {props.courses &&
              props.courses.map((course) => (
                <button
                  id={course.id}
                  className={classes.courseButton}
                  onClick={(e) => setLoadArchivedGroupsID(e.target.id)}
                  key={course.name}
                >
                  {course.name}
                </button>
              ))}
          </div>
          {props.loadingCourses ? <Spinner /> : null}
        </div>
        <hr />
        <div className={classes.groupsContainer}>
          {props.archivedGroupsError ? (
            <p>There are no archived groups.</p>
          ) : null}
          {props.archivedGroupsLoading ? <Spinner size="7" /> : null}
          {props.archivedGroups.length > 0
            ? props.archivedGroups.map((group, index) => (
                <GroupTable
                  groupIndex={index}
                  groupId={group.id}
                  group={group}
                  key={group.id}
                  archived={true}
                />
              ))
            : null}
        </div>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
    archivedGroups: state.archived.archivedGroups,
    archivedGroupsError: state.archived.error,
    archivedGroupsLoading: state.archived.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCourses: () => dispatch(loadCourses()),
    loadArchivedGroups: (id) => dispatch(loadArchivedGroups(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
