import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useTheme } from "../ThemeProvider";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineElement,
  zoomPlugin,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const defaultData: ChartData<"line"> = {
  labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  datasets: [
    {
      label: "Sample Data",
      data: [65, 59, 80, 81, 56, 55, 20, 25, 10, 30, 45, 40],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    },
  ],
};

const LineChart: React.FC = () => {
  const { theme } = useTheme();
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>(defaultData);

  useEffect(() => {
    const chart = chartRef?.current;
    if (!chart) return;

    const updateGradient = () => {
      const isDark = theme === "dark";
      const ctx = chart.ctx;
      const area = chart.chartArea;

      if (!ctx || !area) return;

      let backgroundColor;
      if (theme === "light") {
        const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
        gradient.addColorStop(0, "rgba(22, 101, 52, 0.4)"); // brand-700 with opacity
        gradient.addColorStop(1, "rgba(14, 165, 233, 0.4)"); // accent-500 with opacity
        backgroundColor = gradient;
      } else {
        backgroundColor = "rgba(255, 255, 255, 0.0)";
      }

      const newData = {
        ...defaultData,
        datasets: [
          {
            ...defaultData.datasets[0],
            borderColor: isDark ? "var(--accent-500)" : "var(--brand-700)",
            backgroundColor,
          },
        ],
      };

      setChartData(newData);
    };

    // Initial update
    updateGradient();

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      if (chart.ctx && chart.chartArea) {
        updateGradient();
      }
    });

    resizeObserver.observe(chart.canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [theme]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "var(--neutral-800)" : "var(--neutral-50)",
        titleColor: theme === "dark" ? "var(--neutral-50)" : "var(--neutral-900)",
        bodyColor: theme === "dark" ? "var(--neutral-50)" : "var(--neutral-900)",
        borderColor: theme === "dark" ? "var(--neutral-700)" : "var(--neutral-300)",
        borderWidth: 1,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          pinch: { enabled: true },
          drag: { enabled: true },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    layout: { padding: 10 },
    scales: {
      y: {
        grid: {
          display: true,
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "var(--neutral-400)" : "var(--neutral-600)",
          padding: 14,
        },
        border: {
          display: false,
          color: theme === "dark" ? "var(--neutral-700)" : "var(--neutral-300)",
        },
        position: "right",
      },
      x: {
        grid: { display: false },
        ticks: {
          color: theme === "dark" ? "var(--neutral-400)" : "var(--neutral-600)",
          padding: 14,
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] pt-4 text-tbase">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
