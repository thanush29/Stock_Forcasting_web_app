# AI Stock Forecasting Web App

## 🚀 Overview
A modern, interactive stock forecasting web application powered by AI predictions, real-time data, and beautiful animations.

## 📁 Project Structure
```
src/
├── components/           # React components
│   ├── Header.jsx       # App header with branding
│   ├── StockSelector.jsx # Stock selection and timeframe
│   ├── StockChart.jsx   # Interactive price charts
│   ├── PredictionPanel.jsx # AI predictions display
│   ├── MarketOverview.jsx # Market indices overview
│   └── NewsPanel.jsx    # Stock-related news
├── services/
│   └── stockService.js  # 🔥 MAIN API SERVICE FILE
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles

## 🔌 API Integration

### Main API File: `src/services/stockService.js`

This is the **CORE FILE** that handles all API calls for stock data. Currently uses mock data, but can be easily connected to real APIs.

#### Available API Methods:

1. **getStockData(symbol, timeframe)**
   - Fetches historical stock price data
   - Parameters: stock symbol (e.g., 'AAPL'), timeframe (e.g., '1D', '1M')
   - Returns: price data, volume, current price, change percentage

2. **getPredictions(symbol)**
   - Gets AI-powered stock predictions
   - Parameters: stock symbol
   - Returns: short/medium/long-term predictions with confidence levels

3. **getMarketOverview()**
   - Fetches major market indices data
   - Returns: S&P 500, NASDAQ, DOW, VIX data

4. **getNews(symbol)**
   - Gets stock-related news with sentiment analysis
   - Parameters: stock symbol
   - Returns: news articles with sentiment scores

## 🔄 Working Procedure

### 1. Application Startup
```
User opens app → Header loads → Market overview fetches → Default stock (AAPL) loads
```

### 2. Stock Selection Flow
```
User selects stock → StockSelector triggers → API calls initiated → Data flows to components
```

### 3. Data Flow Architecture
```
stockService.js → App.jsx → Individual Components → UI Updates
```

### 4. Real-time Updates
```
Timer triggers → API refresh → State updates → Component re-renders → Smooth animations
```

## 🔗 API Integration Points

### To Connect Real APIs:

1. **Replace Mock Data in stockService.js:**
```javascript
// Current (Mock):
await new Promise(resolve => setTimeout(resolve, 1000))
return mockData

// Real API Integration:
const response = await fetch(`https://api.example.com/stock/${symbol}`)
return await response.json()
```

2. **Popular Stock APIs to Use:**
   - **Alpha Vantage**: Free tier available, comprehensive data
   - **Yahoo Finance API**: Free, good for basic data
   - **IEX Cloud**: Professional grade, paid
   - **Polygon.io**: Real-time data, paid
   - **Finnhub**: Free tier, good for news and basic data

3. **Example Real API Integration:**
```javascript
// Alpha Vantage Integration Example
export const stockService = {
  async getStockData(symbol, timeframe) {
    const API_KEY = 'your_api_key_here'
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      return processStockData(data)
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}
```

## 🎯 Key Features

- **Real-time Data**: Live stock prices and market updates
- **AI Predictions**: Machine learning-powered forecasts
- **Interactive Charts**: Zoom, hover, and time range selection
- **Market News**: Sentiment analysis and relevant articles
- **Responsive Design**: Works on all devices
- **Smooth Animations**: Framer Motion powered transitions

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open browser to `http://localhost:3000`

## 🔧 Customization

- **Add New Stocks**: Update `stockOptions` in `StockSelector.jsx`
- **Change Themes**: Modify colors in `tailwind.config.js`
- **Add APIs**: Update methods in `stockService.js`
- **New Components**: Create in `src/components/` directory

## 📊 Data Sources

Currently using **mock data** for demonstration. To use real data:

1. Sign up for a stock API service
2. Get API key
3. Replace mock functions in `stockService.js`
4. Add error handling and rate limiting

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern glass-like cards
- **Gradient Backgrounds**: Beautiful color transitions
- **Hover Effects**: Interactive element responses
- **Loading States**: Smooth loading animations
- **Responsive Layout**: Mobile-first design approach