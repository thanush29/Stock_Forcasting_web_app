import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'

const MarketOverview = () => {
  const marketData = [
    { name: 'S&P 500', value: '4,567.89', change: '+1.2%', positive: true },
    { name: 'NASDAQ', value: '14,234.56', change: '+0.8%', positive: true },
    { name: 'DOW', value: '34,567.12', change: '-0.3%', positive: false },
    { name: 'VIX', value: '18.45', change: '-2.1%', positive: false },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-white/80" />
        <h2 className="text-lg font-semibold text-white">Market Overview</h2>
      </div>

      <div className="space-y-3">
        {marketData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div>
              <p className="text-white font-medium text-sm">{item.name}</p>
              <p className="text-white/60 text-xs">{item.value}</p>
            </div>
            
            <div className={`flex items-center space-x-1 ${
              item.positive ? 'text-green-400' : 'text-red-400'
            }`}>
              {item.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{item.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Last updated</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default MarketOverview