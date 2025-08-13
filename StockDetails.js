import React from 'react';
import './StockDetails.css';

// Add this helper function
const safeFormat = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value) || value === "N/A") {
    return "N/A";
  }
  return Number(value).toFixed(decimals);
};

const formatLargeNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "N/A";
  }
  
  const num = Number(value);
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  } else if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  } else if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  } else {
    return num.toLocaleString();
  }
};

const StockDetails = ({ stockData }) => {
  if (!stockData) {
    return (
      <div className="stock-details">
        <div className="stock-header">
          <h2>N/A (N/A)</h2>
        </div>
        <div className="stock-metrics">
          <div className="metric-row">
            <div className="metric">
              <span className="label">OPEN</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">HIGH</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">LOW</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">VOLUME</span>
              <span className="value">N/A</span>
            </div>
          </div>
          <div className="metric-row">
            <div className="metric">
              <span className="label">MARKET CAP</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">P/E RATIO</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">52W HIGH</span>
              <span className="value">N/A</span>
            </div>
            <div className="metric">
              <span className="label">52W LOW</span>
              <span className="value">N/A</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const changeClass = stockData.change >= 0 ? 'positive' : 'negative';

  return (
    <div className="stock-details">
      <div className="stock-header">
        <h2>{safeFormat(stockData.current_price)} {stockData.company_name} ({stockData.symbol})</h2>
        <div className={`price-change ${changeClass}`}>
          {safeFormat(stockData.change)} ({safeFormat(stockData.change_percent)}%)
        </div>
      </div>

      <div className="stock-metrics">
        <div className="metric-row">
          <div className="metric">
            <span className="label">OPEN</span>
            <span className="value">{safeFormat(stockData.open_price)}</span>
          </div>
          <div className="metric">
            <span className="label">HIGH</span>
            <span className="value">{safeFormat(stockData.high_price)}</span>
          </div>
          <div className="metric">
            <span className="label">LOW</span>
            <span className="value">{safeFormat(stockData.low_price)}</span>
          </div>
          <div className="metric">
            <span className="label">VOLUME</span>
            <span className="value">{formatLargeNumber(stockData.volume)}</span>
          </div>
        </div>

        <div className="metric-row">
          <div className="metric">
            <span className="label">MARKET CAP</span>
            <span className="value">{formatLargeNumber(stockData.market_cap)}</span>
          </div>
          <div className="metric">
            <span className="label">P/E RATIO</span>
            <span className="value">{safeFormat(stockData.pe_ratio)}</span>
          </div>
          <div className="metric">
            <span className="label">52W HIGH</span>
            <span className="value">{safeFormat(stockData['52_week_high'])}</span>
          </div>
          <div className="metric">
            <span className="label">52W LOW</span>
            <span className="value">{safeFormat(stockData['52_week_low'])}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetails;
