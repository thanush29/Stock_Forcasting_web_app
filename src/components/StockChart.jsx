import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const StockChart = ({ data, symbol, timeframe }) => {
  const chartRef = useRef()

  // Mock data for demonstration
  const mockData = {
    labels: Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return date.toLocaleDateString()
    }),
    datasets: [
      {
        label: `${symbol} Price`,
        data: Array.from({ length: 30 }, () => 
          Math.random() * 50 + 150 + Math.sin(Math.random() * 10) * 20
        ),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  }

  const currentPrice = mockData.datasets[0].data[mockData.datasets[0].data.length - 1]
  const previousPrice = mockData.datasets[0].data[mockData.datasets[0].data.length - 2]
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2)
  const isPositive = priceChange >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">{symbol}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              ${currentPrice.toFixed(2)}
            </span>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-white/60 text-sm">Timeframe: {timeframe}</p>
          <p className="text-white/60 text-xs">Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="chart-container">
        <Line ref={chartRef} data={mockData} options={options} />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
        <div className="text-center">
          <p className="text-white/60 text-xs">High</p>
          <p className="text-white font-semibold">${(currentPrice * 1.05).toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs">Low</p>
          <p className="text-white font-semibold">${(currentPrice * 0.95).toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs">Volume</p>
          <p className="text-white font-semibold">2.4M</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs">Market Cap</p>
          <p className="text-white font-semibold">$2.8T</p>
        </div>
      </div>
    </motion.div>
  )
}

export default StockChart