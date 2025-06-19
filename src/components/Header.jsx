import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Brain, BarChart3 } from 'lucide-react'

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card mx-4 mt-4 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">
                AI Stock Forecasting
              </h1>
              <p className="text-white/70 text-sm">
                Powered by Advanced Machine Learning
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-white/80">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">Real-time Data</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <BarChart3 className="w-5 h-5" />
            <span className="text-sm">AI Predictions</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header