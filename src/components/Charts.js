import React, { useEffect, useState } from "react";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterday2 = new Date(today);
yesterday2.setDate(yesterday2.getDate() - 2);
const yesterday3 = new Date(today);
yesterday3.setDate(yesterday3.getDate() - 3);
const yesterday4 = new Date(today);
yesterday4.setDate(yesterday4.getDate() - 4);
const yesterday5 = new Date(today);
yesterday5.setDate(yesterday5.getDate() - 5);
const yesterday6 = new Date(today);
yesterday6.setDate(yesterday6.getDate() - 6);
const date = [
  yesterday6.toLocaleDateString(),
  yesterday5.toLocaleDateString(),
  yesterday4.toLocaleDateString(),
  yesterday3.toLocaleDateString(),
  yesterday2.toLocaleDateString(),
  yesterday.toLocaleDateString(),
  today.toLocaleDateString(),
];

export const SalesValueChart = ({ type, data }) => {
  const [xWeek, setXWeek] = useState(date);
  const [yWeek, setYWeek] = useState();
  const dataWeek = {
    labels: xWeek,
    series: [data],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: true,
      showLabel: true,
      labelInterpolationFnc: (value) => `${value}`,
    },
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={dataWeek}
      options={{ ...options, plugins }}
      type="Line"
      className="ct-series-g ct-double-octave"
    />
  );
};

export const SalesValueChartphone = ({ type, data }) => {
  const [xWeek, setXWeek] = useState(date);
  const [yWeek, setYWeek] = useState();
  const dataWeek = {
    labels: xWeek,
    series: [data],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: false,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      // On the y-axis start means left and end means right
      showGrid: true,
      showLabel: true,
      labelInterpolationFnc: (value) => `${value}`,
    },
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={dataWeek}
      options={{ ...options, plugins }}
      type="Line"
      className="ct-series-g ct-major-tenth"
    />
  );
};

export const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: (value) =>
      `${Math.round((value / series.reduce(sum)) * 100)}%`,
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={{ series }}
      options={{ ...options, plugins }}
      type="Pie"
      className="ct-golden-section"
    />
  );
};

export const BarChart = (props) => {
  const {
    labels = [],
    series = [],
    chartClassName = "ct-golden-section",
  } = props;
  const data = { labels, series };

  const options = {
    low: 0,
    showArea: true,
    axisX: {
      position: "end",
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
  };

  const plugins = [ChartistTooltip()];

  return (
    <Chartist
      data={data}
      options={{ ...options, plugins }}
      type="Bar"
      className={chartClassName}
    />
  );
};
