import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

import classes from "./Costs.module.css";
import Layout from "../Layout/Layout";
import {
  loadChartData,
  addMonthExpenseToChart,
} from "../../redux/actions/expensesChartActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  addingExpense,
  loadExpenses,
} from "../../redux/actions/allTimeExpensesActions";
import InfoTable from "../../components/InfoTable/InfoTable";

function Costs(props) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [currentExpenses, setCurrentExpenses] = useState([]);
  const [formIsEmpty, setFormIsEmpty] = useState(false)

  useEffect(() => {
    if (props.chartData.length === 0) {
      props.loadChartData(props.token);
    }
    if (props.yearlyExpenses.length === 0) {
      props.loadAllExpenses(props.token);
    }
  }, []);

  useEffect(() => {
    setCurrentExpenses(props.weeklyExpenses);
  }, [props.weeklyExpenses]);

  const data = {
    labels: props.chartLabels,
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
    const singleExpense = {
      name: name,
      price: cost,
      description: description,
      date: date,
    };
    e.preventDefault();
    if(name.length != 0 && cost.length != 0 && description.length != 0){
      props.addMonthExpenseToChart(date.getMonth(), singleExpense.price, props.token);
      props.addingExpense(singleExpense, props.token);
      setFormIsEmpty(false)
      setName('')
      setCost('')
      setDescription('')
    } else {
      setFormIsEmpty(true)
    }
  };

  return (
    <div className={classes.container}>
      <Layout>
        <h1 className={classes.title}>Costs</h1>
        <hr />
        <div className={classes.form}>
          <h2>Add a new expense</h2>
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
              placeholder="Expense"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
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
        <div className={classes.expensesContainer}>
          {props.expensesError ? <p>Failed to load all Earnings.</p> : null}
          <div className={classes.buttonsWrapper}>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentExpenses(props.weeklyExpenses)}
            >
              Weekly
            </button>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentExpenses(props.monthlyExpenses)}
            >
              Monthly
            </button>
            <button
              className={classes.timeLineButtons}
              onClick={() => setCurrentExpenses(props.yearlyExpenses)}
            >
              Yearly
            </button>
          </div>
          {props.loadingExpenses ? <Spinner size="3" /> : null}
          <InfoTable data={currentExpenses} />
        </div>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    chartData: state.expensesChartData.data,
    chartLabels: state.expensesChartData.labels,
    loadingChart: state.expensesChartData.loading,
    chartError: state.expensesChartData.error,
    weeklyExpenses: state.allExpenses.weeklyExpenses,
    monthlyExpenses: state.allExpenses.monthlyExpenses,
    yearlyExpenses: state.allExpenses.allTimeExpenses,
    loadingExpenses: state.allExpenses.loading,
    expensesError: state.allExpenses.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadChartData: (token) => dispatch(loadChartData(token)),
    addMonthExpenseToChart: (month, expense, token) =>
      dispatch(addMonthExpenseToChart(month, expense, token)),
    addingExpense: (expense, token) => dispatch(addingExpense(expense, token)),
    loadAllExpenses: (token) => dispatch(loadExpenses(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Costs);
