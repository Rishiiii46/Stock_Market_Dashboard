import React, { useState, useEffect } from 'react';
import './TechnicalIndicators.css';

const TechnicalIndicators = ({ symbol }) => {
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (symbol) {
      fetchIndicators();
    }
  }, [symbol]);

  const fetchIndicators = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stock/${symbol}/technical-indicators`);
      const data = await response.json();
      setIndicators(data.indicators);
    } catch (error) {
      console.error('Error fetching technical indicators:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading indicators...</div>;
  if (!indicators) return <div>No technical indicators available</div>;

  const formatValue = (value) => {
    return value ? value.toFixed(2) : 'N/A';
  };

  const getRSIStatus = (rsi) => {
    if (rsi > 70) return { status: 'Overbought', class: 'negative' };
    if (rsi < 30) return { status: 'Oversold', class: 'positive' };
    return { status: 'Neutral', class: 'neutral' };
  };

  const rsiStatus = indicators.rsi ? getRSIStatus(indicators.rsi) : { status: 'N/A', class: 'neutral' };

  return (
    <div className="technical-indicators">
      <h3>Technical Indicators</h3>

      <div className="indicators-grid">
        <div className="indicator-card">
          <h4>Moving Averages</h4>
          <div className="indicator-item">
            <span>MA 20:</span>
            <span>${formatValue(indicators.ma_20)}</span>
          </div>
          <div className="indicator-item">
            <span>MA 50:</span>
            <span>${formatValue(indicators.ma_50)}</span>
          </div>
        </div>

        <div className="indicator-card">
          <h4>RSI</h4>
          <div className="indicator-item">
            <span>RSI (14):</span>
            <span>{formatValue(indicators.rsi)}</span>
          </div>
          <div className={`rsi-status ${rsiStatus.class}`}>
            {rsiStatus.status}
          </div>
        </div>

        <div className="indicator-card">
          <h4>Bollinger Bands</h4>
          <div className="indicator-item">
            <span>Upper:</span>
            <span>${formatValue(indicators.bb_upper)}</span>
          </div>
          <div className="indicator-item">
            <span>Middle:</span>
            <span>${formatValue(indicators.bb_middle)}</span>
          </div>
          <div className="indicator-item">
            <span>Lower:</span>
            <span>${formatValue(indicators.bb_lower)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;