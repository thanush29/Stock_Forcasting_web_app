# 🔌 API Integration Guide

## Current API Structure

### Main API File: `src/services/stockService.js`

This file contains all API-related functions. Currently uses **mock data** but is structured for easy real API integration.

## 🔄 How It Works

### 1. Data Flow
```
User Action → Component → stockService.js → API Call → Data Processing → UI Update
```

### 2. API Methods Overview

#### `getStockData(symbol, timeframe)`
- **Purpose**: Fetch historical stock price data
- **Current**: Returns mock OHLCV data
- **Real API**: Connect to Alpha Vantage, Yahoo Finance, etc.

#### `getPredictions(symbol)`
- **Purpose**: Get AI-powered stock predictions
- **Current**: Returns mock predictions with confidence levels
- **Real API**: Connect to ML prediction service or build custom

#### `getMarketOverview()`
- **Purpose**: Fetch major market indices
- **Current**: Returns mock S&P 500, NASDAQ, DOW data
- **Real API**: Connect to market data provider

#### `getNews(symbol)`
- **Purpose**: Get stock-related news with sentiment
- **Current**: Returns mock news articles
- **Real API**: Connect to news API with sentiment analysis

## 🔗 Real API Integration Examples

### 1. Alpha Vantage Integration
```javascript
const ALPHA_VANTAGE_KEY = 'your_api_key'

async getStockData(symbol, timeframe) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    // Process the data to match our format
    return {
      symbol,
      data: Object.entries(data['Time Series (Daily)']).map(([date, values]) => ({
        timestamp: date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      }))
    }
  } catch (error) {
    console.error('Alpha Vantage API Error:', error)
    throw error
  }
}
```

### 2. Yahoo Finance Integration
```javascript
async getStockData(symbol, timeframe) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    const result = data.chart.result[0]
    
    return {
      symbol,
      currentPrice: result.meta.regularMarketPrice,
      data: result.timestamp.map((time, index) => ({
        timestamp: new Date(time * 1000).toISOString(),
        open: result.indicators.quote[0].open[index],
        high: result.indicators.quote[0].high[index],
        low: result.indicators.quote[0].low[index],
        close: result.indicators.quote[0].close[index],
        volume: result.indicators.quote[0].volume[index]
      }))
    }
  } catch (error) {
    console.error('Yahoo Finance API Error:', error)
    throw error
  }
}
```

### 3. News API Integration
```javascript
const NEWS_API_KEY = 'your_news_api_key'

async getNews(symbol) {
  const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&pageSize=10`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    return data.articles.map(article => ({
      title: article.title,
      summary: article.description,
      publishedAt: article.publishedAt,
      source: article.source.name,
      url: article.url,
      sentiment: 'neutral' // Add sentiment analysis here
    }))
  } catch (error) {
    console.error('News API Error:', error)
    throw error
  }
}
```

## 🔧 Implementation Steps

### Step 1: Choose Your APIs
- **Stock Data**: Alpha Vantage, IEX Cloud, Polygon.io
- **News**: NewsAPI, Finnhub, Alpha Vantage News
- **Market Data**: Yahoo Finance, Alpha Vantage

### Step 2: Get API Keys
1. Sign up for chosen services
2. Get API keys
3. Store in environment variables

### Step 3: Update stockService.js
1. Replace mock functions with real API calls
2. Add error handling
3. Add rate limiting if needed

### Step 4: Add Environment Variables
Create `.env` file:
```
VITE_ALPHA_VANTAGE_KEY=your_key_here
VITE_NEWS_API_KEY=your_key_here
```

### Step 5: Update API Calls
```javascript
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY
```

## 🚨 Important Notes

1. **Rate Limits**: Most free APIs have rate limits
2. **CORS**: Some APIs require backend proxy
3. **Error Handling**: Always add try-catch blocks
4. **Loading States**: Show loading while fetching data
5. **Caching**: Consider caching frequently requested data

## 🔒 Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use environment variables**
3. **Consider backend proxy for sensitive APIs**
4. **Implement rate limiting**
5. **Add request timeout handling**

## 📈 Recommended API Providers

### Free Tier Options:
- **Alpha Vantage**: 5 calls/minute, 500 calls/day
- **Yahoo Finance**: Unofficial but free
- **IEX Cloud**: 50,000 calls/month free

### Paid Options:
- **Polygon.io**: Real-time data, $99/month
- **IEX Cloud**: Professional plans from $9/month
- **Finnhub**: Real-time data, $7.99/month