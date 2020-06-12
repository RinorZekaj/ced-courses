import React from "react";
import moment from 'moment'

import classes from "./InfoTableRow.module.css";

const InfoTableRow = ({ data, loading }) =>
  data.map((data) => {
    return (
      <tr className={classes.tableRow} key={data.id}>
        <td className={classes.tableData}>{data.name}</td>
        <td className={classes.tableData}>{data.price}</td>
        <td className={classes.tableData}>{data.description}</td>
        <td className={classes.tableData}>{moment(data.date).format("D") + "-" + moment(data.date).format("M") + "-" + moment(data.date).format("Y")}</td>
      </tr>
    );
  });

export default InfoTableRow;
