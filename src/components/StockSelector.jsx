import React from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'
import { Clock, Search } from 'lucide-react'

const stockOptions = [
  { value: 'AAPL', label: 'Apple Inc. (AAPL)' },
  { value: 'MSFT', label: 'Microsoft (MSFT)' },
  { value: 'GOOGL', label: 'Alphabet (GOOGL)' },
  { value: 'AMZN', label: 'Amazon (AMZN)' },
  { value: 'TSLA', label: 'Tesla (TSLA)' },
  { value: 'META', label: 'Meta Platforms (META)' },
  { value: 'NVDA', label: 'NVIDIA (NVDA)' },
  { value: 'NFLX', label: 'Netflix (NFLX)' },
  { value: 'ADBE', label: 'Adobe (ADBE)' },
  { value: 'CRM', label: 'Salesforce (CRM)' },
]

const timeframeOptions = [
  { value: '1D', label: '1 Day' },
  { value: '5D', label: '5 Days' },
  { value: '1M', label: '1 Month' },
  { value: '3M', label: '3 Months' },
  { value: '6M', label: '6 Months' },
  { value: '1Y', label: '1 Year' },
  { value: '2Y', label: '2 Years' },
  { value: '5Y', label: '5 Years' },
]

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    color: 'white',
    minHeight: '44px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'transparent',
    color: 'white',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.7)',
  }),
}

const StockSelector = ({ selectedStock, onStockChange, timeframe, onTimeframeChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 space-y-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-5 h-5 text-white/80" />
        <h2 className="text-lg font-semibold text-white">Stock Selection</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Select Stock
          </label>
          <Select
            value={stockOptions.find(option => option.value === selectedStock)}
            onChange={(option) => onStockChange(option.value)}
            options={stockOptions}
            styles={customSelectStyles}
            isSearchable
            placeholder="Search stocks..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            <Clock className="w-4 h-4 inline mr-1" />
            Timeframe
          </label>
          <Select
            value={timeframeOptions.find(option => option.value === timeframe)}
            onChange={(option) => onTimeframeChange(option.value)}
            options={timeframeOptions}
            styles={customSelectStyles}
            placeholder="Select timeframe..."
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/20">
        <div className="text-xs text-white/60">
          <p>• Real-time market data</p>
          <p>• AI-powered predictions</p>
          <p>• Technical analysis</p>
        </div>
      </div>
    </motion.div>
  )
}

export default StockSelector