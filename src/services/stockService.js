// Mock stock service - In production, this would connect to real APIs
export const stockService = {
  async getStockData(symbol, timeframe) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data generation
    const generateMockData = () => {
      const basePrice = Math.random() * 100 + 100
      const dataPoints = timeframe === '1D' ? 24 : 30
      
      return {
        symbol,
        timeframe,
        data: Array.from({ length: dataPoints }, (_, i) => ({
          timestamp: new Date(Date.now() - (dataPoints - i) * 3600000).toISOString(),
          open: basePrice + Math.random() * 10 - 5,
          high: basePrice + Math.random() * 15,
          low: basePrice - Math.random() * 10,
          close: basePrice + Math.random() * 10 - 5,
          volume: Math.floor(Math.random() * 1000000) + 500000,
        })),
        currentPrice: basePrice,
        change: Math.random() * 10 - 5,
        changePercent: (Math.random() * 10 - 5).toFixed(2),
      }
    }
    
    return generateMockData()
  },

  async getPredictions(symbol) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock AI predictions
    return {
      symbol,
      predictions: {
        shortTerm: {
          direction: Math.random() > 0.5 ? 'bullish' : 'bearish',
          confidence: Math.floor(Math.random() * 40) + 60,
          targetPrice: Math.random() * 50 + 150,
          timeframe: '1 week',
        },
        mediumTerm: {
          direction: Math.random() > 0.4 ? 'bullish' : 'bearish',
          confidence: Math.floor(Math.random() * 30) + 50,
          targetPrice: Math.random() * 60 + 140,
          timeframe: '1 month',
        },
        longTerm: {
          direction: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)],
          confidence: Math.floor(Math.random() * 20) + 40,
          targetPrice: Math.random() * 80 + 120,
          timeframe: '3 months',
        },
      },
      insights: [
        'Technical indicators suggest strong momentum',
        'Volume analysis shows institutional interest',
        'Market sentiment remains positive',
        'Support levels holding strong',
      ],
      lastUpdated: new Date().toISOString(),
    }
  },

  async getMarketOverview() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      indices: [
        { name: 'S&P 500', value: 4567.89, change: 1.2 },
        { name: 'NASDAQ', value: 14234.56, change: 0.8 },
        { name: 'DOW', value: 34567.12, change: -0.3 },
        { name: 'VIX', value: 18.45, change: -2.1 },
      ],
      lastUpdated: new Date().toISOString(),
    }
  },

  async getNews(symbol) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    return [
      {
        title: `${symbol} Reports Strong Quarterly Results`,
        summary: 'Company exceeds analyst expectations with record revenue growth and positive outlook.',
        publishedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        sentiment: 'positive',
        source: 'Financial Times',
        url: '#',
      },
      {
        title: 'Market Volatility Expected This Week',
        summary: 'Federal Reserve meeting and economic data releases could impact market direction.',
        publishedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
        sentiment: 'neutral',
        source: 'Reuters',
        url: '#',
      },
      {
        title: 'Tech Sector Outlook Remains Positive',
        summary: 'Analysts maintain bullish stance on technology stocks despite recent volatility.',
        publishedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
        sentiment: 'positive',
        source: 'Bloomberg',
        url: '#',
      },
    ]
  },
}