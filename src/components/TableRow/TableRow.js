import React from "react";

import classes from "./TableRow.module.css";
import TableCell from "../TableCell/TableCell";

function TableRow(props) {
  const rowData = [];

  Object.entries(props.student).map((data, index) =>
    data[0] !== "id"
      ? rowData.push(
          <td className={classes.tableData} key={index}>
            <TableCell
              // change={(key, value) => changeMember(props.student, key, value)}
              value={data[1]} 
              memberKey={data[0]}
              student={props.student}
              name={data[1]}
              keys={data[0]}
              archived={props.archived}
              student={props.student}
              courseId={props.courseId}
              groupId={props.groupId}
              studentId={props.studentId}
            />
          </td>
        )
      : null
  );

  return (
    <tr className={classes.TableRow}>
      {rowData}
      {props.archived ? null : <td className={classes.deleteCell}>
        <button
          className={classes.deleteMemberButton}
          id={props.studentId}
          onClick={(e) => props.deletingMemeber(e.target.id)}
        >
          DELETE
        </button>
      </td>}
    </tr>
  );
}

export default TableRow;
