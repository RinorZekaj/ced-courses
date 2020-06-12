import React, { useEffect, useState } from "react";

import classes from "./Earnings.module.css";
import Layout from "../Layout/Layout";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import {
  loadChartData,
  addMonthProfitToChart,
} from "../../redux/actions/earningsChartActions";
import {
  addingEarning,
  loadingEarnings,
} from "../../redux/actions/allTimeEarningsActions";
import Infotable from "../../components/InfoTable/InfoTable";
import Spinner from "../../components/UI/Spinner/Spinner";

function Earnings(props) {
  const [name, setName] = useState("");
  const [earning, setEarning] = useState("");
  const [description, setDescription] = useState("");
  const [currentEarnings, setCurrentEarnings] = useState([]);
  const [formIsEmpty, setFormIsEmpty] = useState(false);

  useEffect(() => {
    if (props.chartData.length === 0) {
      props.loadChartData(props.token);
    }
    if (props.yearlyEarnings.length === 0) {
      props.loadAllProfits(props.token);
    }
  }, []);

  useEffect(() => {
    console.log("1", props.weeklyEarnings);
    setCurrentEarnings(props.weeklyEarnings);
  }, [props.weeklyEarnings]);

  const data = {
    labels: props.chartLabeles,
    datasets: [
      {
        label: "Earnings",
        data: props.chartData,
        backgroundColor: "rgba(71,160,200, 0.6)",
        borderColor: ["rgba(67,150,215, 1)"],
        pointBorderColor: "rgba(67,150,215, 0.7)",
      },
    ],
  };

  const onSendHandler = (e) => {
    const date = new Date();
    const singleProfit = {
      name: name,
      price: earning,
      description: description,
      date: date,
    };
    e.preventDefault();

    if (name.length != 0 && earning.length != 0 && description.length != 0) {
      props.addMonthProfitToChart(date.getMonth(), singleProfit.price, props.token);
      props.addingEarning(singleProfit, props.token);
      setFormIsEmpty(false);
      setName("");
      setEarning("");
      setDescription("");
    } else {
      setFormIsEmpty(true);
    }
  };

  return (
    <div className={classes.container}>
      <Layout height="auto">
        <h1 className={classes.title}>Earnings</h1>
        <hr />
        <div className={classes.form}>
          <h2>Add a new profit</h2>
          <form onSubmit={(e) => onSendHandler(e)}>
            <input
              type="text"
              className={classes.input}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className={classes.input}
              placeholder="Earnings"
              value={earning}
              onChange={(e) => setEarning(e.target.value)}
            />
            <input
              type="text"
              className={classes.input}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {formIsEmpty ? <p>Please fill out the fields to submit.</p> : null} 
            <button type="submit" className={classes.button}>
              Submit
            </button>
          </form>
        </div>
        <div className={classes.chartContainer}>
          {props.loadingChart ? <Spinner size /> : null}
          {props.chartError ? <p>Opss! Failed loading chart.</p> : null}
          <Line data={data} />
        </div>
        <div className={classes.earningsContainer}>
          {props.profitsError ? <p>Failed to load all Earnings.</p> : null}
          <div className={classes.buttonsWrapper}>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentEarnings(props.weeklyEarnings)}
            >
              Weekly
            </button>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentEarnings(props.monthlyEarnings)}
            >
              Monthly
            </button>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentEarnings(props.yearlyEarnings)}
            >
              Yearly
            </button>
          </div>
          {props.loadingProfits ? <Spinner size="3" /> : null}
          <Infotable data={currentEarnings} />
        </div>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    chartData: state.earningsChartData.data,
    chartLabeles: state.earningsChartData.labels,
    weeklyEarnings: state.allEarnings.weeklyEarnings,
    monthlyEarnings: state.allEarnings.monthlyEarnings,
    yearlyEarnings: state.allEarnings.allTimeEarnings,
    loadingChart: state.earningsChartData.loading,
    chartError: state.earningsChartData.error,
    loadingProfits: state.allEarnings.loading,
    profitsError: state.allEarnings.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadChartData: (token) => dispatch(loadChartData(token)),
    addMonthProfitToChart: (month, profit, token) =>
      dispatch(addMonthProfitToChart(month, profit, token)),
    addingEarning: (profit, token) => dispatch(addingEarning(profit, token)),
    loadAllProfits: (token) => dispatch(loadingEarnings(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);
