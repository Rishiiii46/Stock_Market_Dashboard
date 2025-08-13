import React, { useState, useEffect } from 'react';
import './App.css';
import StockList from './components/StockList';
import StockChart from './components/StockChart';
import StockDetails from './components/StockDetails';
import TechnicalIndicators from './components/TechnicalIndicators';
import PredictionPanel from './components/PredictionPanel';
import Header from './components/Header';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/companies`);
      const data = await response.json();
      setCompanies(data);

      // Select first company by default
      if (data.length > 0) {
        setSelectedStock(data[0]);
        fetchStockData(data[0].symbol);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const fetchStockData = async (symbol) => {
    setLoading(true);
    try {
      const [currentResponse, historyResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/stock/${symbol}/current`),
        fetch(`${API_BASE_URL}/api/stock/${symbol}/history?period=1y`)
      ]);

      const currentData = await currentResponse.json();
      const historyData = await historyResponse.json();

      setStockData({
        current: currentData,
        history: historyData
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    fetchStockData(stock.symbol);
  };

  return (
    <div className="App">
      <Header />
      <div className="dashboard">
        <div className="sidebar">
          <StockList
            companies={companies}
            selectedStock={selectedStock}
            onStockSelect={handleStockSelect}
          />
        </div>
        <div className="main-content">
          {loading ? (
            <div className="loading">Loading stock data...</div>
          ) : stockData ? (
            <>
              <StockDetails stockData={stockData.current} />
              <StockChart 
                symbol={selectedStock?.symbol}
                historyData={stockData.history}
              />
              <div className="bottom-panels">
                <TechnicalIndicators symbol={selectedStock?.symbol} />
                <PredictionPanel symbol={selectedStock?.symbol} />
              </div>
            </>
          ) : (
            <div className="no-data">Select a stock to view data</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;