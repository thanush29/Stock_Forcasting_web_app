import React from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ExternalLink, Clock } from 'lucide-react'

const NewsPanel = ({ stock }) => {
  // Mock news data
  const newsData = [
    {
      title: `${stock} Reports Strong Q4 Earnings`,
      summary: 'Company exceeds analyst expectations with record revenue growth.',
      time: '2 hours ago',
      sentiment: 'positive',
      url: '#'
    },
    {
      title: 'Market Volatility Expected This Week',
      summary: 'Federal Reserve meeting could impact tech stocks significantly.',
      time: '4 hours ago',
      sentiment: 'neutral',
      url: '#'
    },
    {
      title: 'Analyst Upgrades Tech Sector',
      summary: 'Major investment firm raises price targets for leading tech companies.',
      time: '6 hours ago',
      sentiment: 'positive',
      url: '#'
    },
  ]

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Newspaper className="w-5 h-5 text-white/80" />
        <h2 className="text-lg font-semibold text-white">Market News</h2>
      </div>

      <div className="space-y-4">
        {newsData.map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                {news.title}
              </h3>
              <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white/60 transition-colors flex-shrink-0 ml-2" />
            </div>
            
            <p className="text-white/60 text-xs mb-2 line-clamp-2">
              {news.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-white/40">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{news.time}</span>
              </div>
              
              <div className={`w-2 h-2 rounded-full ${
                news.sentiment === 'positive' ? 'bg-green-400' :
                news.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
              }`}></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <button className="w-full text-center text-blue-300 hover:text-blue-200 text-sm transition-colors">
          View All News →
        </button>
      </div>
    </motion.div>
  )
}

export default NewsPanel