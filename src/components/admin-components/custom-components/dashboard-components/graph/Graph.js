import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler to enable area filling
} from "chart.js";
import useUserCreationStats from "@/hooks/dashboard/useUserGraph";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler for filling the area under the line
);

// const month = Array.from({ length: 31 }, (_, index) => index + 1);

const month = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const year = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const GraphComponent = (props) => {
  const [labelMain, setLabelMain] = useState(year);
  const [dummyNumber, setDummyNumber] = useState(0);

  const {
    data: mainData,
    loading,
    error: err,
  } = useUserCreationStats(props.timeFrame);

  useEffect(() => {
    if (props.timeFrame === "year") {
      setLabelMain(year);
      setDummyNumber(12);
    } else if (props.timeFrame === "month") {
      setLabelMain(month);
      setDummyNumber(31);
    } else if (props.timeFrame === "week") {
      setLabelMain(days);
      setDummyNumber(7);
    }
  }, [props.timeFrame]);

  // console.log(mainData);

  /* Start */
  const data = {
    labels: labelMain,
    datasets: [
      {
        label: "Marapolsa Users",
        data: loading
          ? Array.from({ length: dummyNumber }, (_, index) => index + 1)
          : mainData,
        backgroundColor: "rgba(232, 108, 68, 0.2)", // Set background color with opacity for fill
        borderColor: "#E86C44",
        tension: 0.4,
        fill: true, // Make sure fill is set to true
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  /* End */

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: "50px 20px",
        margin: "10px 0",
      }}
    >
      <Line data={data} options={options} style={{ height: 400 }} />
    </div>
  );
};

export default GraphComponent;
