import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

const Chart = ({ chart }) => {
  const messages = useSelector((state) => state.auth.messages);

  const labels = messages.map((e) => e.from.name);
  const textLength = messages.map((e) => e.body.length);

  const data = {
    labels: labels,
    datasets: [
      {
        //this is where data for PER X-horizonatl line , including border style and color of those element
        label: `length of text`,
        data: textLength,
        backgroundColor: ["#4dabf5"],
      },
    ],
    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
  };

  return (
    <>
      <>
        {chart === "Line" ? (
          <Line
            width={100}
            height={"20vh"}
            data={data}
            options={{
              title: {
                display: true,
                text: "Line Chart Title",
              },
            }}
          />
        ) : chart === "Bar" ? (
          <Bar
            data={data}
            width={100}
            height={"20vh"}
            options={{
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
              legend: { position: "right" },
              title: {
                display: true,
                text: "Bar Chart Title",
              },
            }}
          />
        ) : chart === "Pie" ? (
          <Pie
            width={100}
            height={"20vh"}
            data={{
              ...data,
              datasets: [
                {
                  ...data.datasets[0],
                  backgroundColor: [
                    ...data.datasets[0].backgroundColor,
                    "rgba(125, 166, 6, 1)",
                    "rgba(25, 166, 6, 1)",
                    "rgba(125, 16, 6, 1)",
                    "rgba(25, 66, 200, 1)",
                    "rgba(125, 16, 126, 1)",
                    "rgba(125, 100, 106, 1)",
                  ],
                },
              ],
            }}
            options={{
              scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
              legend: { position: "bottom" },
              title: {
                display: true,
                text: "Pie Chart Title",
              },
              //   animation: { animateScale: true },
            }}
          />
        ) : (
          <h1>choose</h1>
        )}
      </>
    </>
  );
};

export default Chart;
