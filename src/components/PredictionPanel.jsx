import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, RefreshCw, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react'

const PredictionPanel = ({ predictions, symbol, onRefresh }) => {
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    await onRefresh()
    setLoading(false)
  }

  // Mock prediction data
  const mockPredictions = {
    shortTerm: {
      direction: 'bullish',
      confidence: 78,
      targetPrice: 185.50,
      timeframe: '1 week',
    },
    mediumTerm: {
      direction: 'bullish',
      confidence: 65,
      targetPrice: 195.20,
      timeframe: '1 month',
    },
    longTerm: {
      direction: 'neutral',
      confidence: 52,
      targetPrice: 180.00,
      timeframe: '3 months',
    },
    aiInsights: [
      'Strong momentum indicators suggest continued upward trend',
      'Volume analysis shows institutional buying interest',
      'Technical patterns indicate potential breakout above $185',
      'Market sentiment remains positive despite volatility',
    ]
  }

  const getPredictionColor = (direction) => {
    switch (direction) {
      case 'bullish': return 'text-green-400'
      case 'bearish': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  const getPredictionIcon = (direction) => {
    switch (direction) {
      case 'bullish': return <TrendingUp className="w-4 h-4" />
      case 'bearish': return <TrendingDown className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">AI Predictions</h2>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
            Beta
          </span>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="btn-secondary flex items-center space-x-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(mockPredictions).slice(0, 3).map(([key, prediction]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div className={`flex items-center space-x-1 ${getPredictionColor(prediction.direction)}`}>
                {getPredictionIcon(prediction.direction)}
                <span className="text-xs font-medium capitalize">
                  {prediction.direction}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60 text-xs">Target Price</span>
                <span className="text-white font-semibold">${prediction.targetPrice}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/60 text-xs">Confidence</span>
                <span className="text-white font-semibold">{prediction.confidence}%</span>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${prediction.confidence}%` }}
                ></div>
              </div>
              
              <div className="text-white/60 text-xs">
                Timeframe: {prediction.timeframe}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white font-semibold">AI Insights</h3>
        </div>
        
        <div className="space-y-2">
          {mockPredictions.aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2"
            >
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/80 text-sm">{insight}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-300 text-xs">
          <strong>Disclaimer:</strong> AI predictions are for informational purposes only and should not be considered as financial advice. Always do your own research before making investment decisions.
        </p>
      </div>
    </motion.div>
  )
}

export default PredictionPanel