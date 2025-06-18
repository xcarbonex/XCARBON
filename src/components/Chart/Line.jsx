import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from '../ThemeProvider';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(LineElement, zoomPlugin, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const defaultData = {
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
  datasets: [
    {
      label: 'Sample Data',
      data: [65, 59, 80, 81, 56, 55, 20, 25, 10, 30, 45, 40],
      borderWidth: 2,
      fill: true,
      tension: 0.4,
    }
  ]
};

function LineChart() {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    const chart = chartRef?.current;
    if (!chart) return;

    const updateGradient = () => {
      const isDark = theme === 'dark';
      const ctx = chart.ctx;
      const area = chart.chartArea;

      if (!ctx || !area) return;

      let backgroundColor;
      if (theme === 'light') {
        const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
        gradient.addColorStop(0, 'rgba(194, 165, 123, 0.4)');
        gradient.addColorStop(1, 'rgba(76, 102, 99, 0.4)');
        backgroundColor = gradient;
      } else {
        backgroundColor = 'rgba(255, 255, 255, 0.0)';
      }

      const newData = {
        ...defaultData,
        datasets: [{
          ...defaultData.datasets[0],
          borderColor: isDark ? '#ffffff' : '#A6B3B1',
          backgroundColor
        }]
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        titleColor: theme === 'dark' ? '#fff' : '#000',
        bodyColor: theme === 'dark' ? '#fff' : '#000'
      },
      zoom: {
        zoom: {
          wheel: { enabled: true, // Require Ctrl key for zooming
            speed: 0.1 },
          pinch: { enabled: true },
          drag: { enabled: true },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    layout: { padding: 10 },
    scales: {
      y: {
        grid: {
          display: true,
          color: theme === 'dark' ? '#fff' : '#000',
          borderColor: theme === 'dark' ? '#fff' : '#000'
        },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          padding: 14
        },
        border: {
          display: false
        },
        position: 'right'
      },
      x: {
        grid: { display: false },
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
          padding: 14
        }
      }
    }
  };

  return (
    <div className="w-full h-[400px] pt-4 text-tbase">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}

export default LineChart;