import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import StockSelector from './components/StockSelector'
import StockChart from './components/StockChart'
import PredictionPanel from './components/PredictionPanel'
import MarketOverview from './components/MarketOverview'
import NewsPanel from './components/NewsPanel'
import { stockService } from './services/stockService'
import toast from 'react-hot-toast'

function App() {
  const [selectedStock, setSelectedStock] = useState('AAPL')
  const [stockData, setStockData] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [timeframe, setTimeframe] = useState('1D')

  useEffect(() => {
    fetchStockData()
  }, [selectedStock, timeframe])

  const fetchStockData = async () => {
    setLoading(true)
    try {
      const data = await stockService.getStockData(selectedStock, timeframe)
      setStockData(data)
      
      // Fetch AI predictions
      const predictionData = await stockService.getPredictions(selectedStock)
      setPredictions(predictionData)
      
      toast.success(`Updated data for ${selectedStock}`)
    } catch (error) {
      toast.error('Failed to fetch stock data')
      console.error('Error fetching stock data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <StockSelector
                selectedStock={selectedStock}
                onStockChange={setSelectedStock}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
              />
              
              <MarketOverview />
              
              <NewsPanel stock={selectedStock} />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-8 text-center"
                  >
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p className="text-white/80">Loading stock data...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <StockChart
                      data={stockData}
                      symbol={selectedStock}
                      timeframe={timeframe}
                    />
                    
                    <PredictionPanel
                      predictions={predictions}
                      symbol={selectedStock}
                      onRefresh={fetchStockData}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default App