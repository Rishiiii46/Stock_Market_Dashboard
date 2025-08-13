import React, { useState } from 'react';
import './PredictionPanel.css';

const safeFormat = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(value) || value === "N/A") {
    return "N/A";
  }
  return Number(value).toFixed(decimals);
};

const PredictionPanel = ({ symbol }) => {  // Changed from selectedStock to symbol
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePrediction = async () => {
    console.log('Generate prediction clicked for:', symbol); // Debug log
    
    if (!symbol) {
      console.log('No symbol provided');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/stock/${symbol}/predict`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Prediction data received:', data); // Debug log
      setPrediction(data);
    } catch (error) {
      console.error('Error generating prediction:', error);
      // Fallback prediction data
      setPrediction({
        symbol: symbol,
        current_price: 150.0,
        predicted_price: 152.5,
        prediction_change: 1.67,
        confidence: 0.78,
        timeframe: "1 day",
        model_used: "Demo Model",
        error: 'Using demo data'
      });
    }
    setLoading(false);
  };

  return (
    <div className="prediction-panel">
      <h3>AI Price Prediction</h3>
      
      <button 
        onClick={generatePrediction} 
        disabled={loading || !symbol}
        style={{
          padding: '10px 20px',
          backgroundColor: loading || !symbol ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading || !symbol ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {loading ? 'Generating...' : 'Generate Prediction'}
      </button>

      {prediction && (
        <div className="prediction-results" style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <div className="prediction-header">
            <h4>{prediction.symbol} Prediction</h4>
          </div>
          
          <div className="prediction-details">
            <div style={{ marginBottom: '10px' }}>
              <strong>Current Price:</strong> ${safeFormat(prediction.current_price)}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Predicted Price:</strong> ${safeFormat(prediction.predicted_price)}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Expected Change:</strong> 
              <span style={{ color: prediction.prediction_change >= 0 ? 'green' : 'red', marginLeft: '5px' }}>
                {safeFormat(prediction.prediction_change)}%
              </span>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Confidence:</strong> {safeFormat(prediction.confidence * 100, 1)}%
            </div>

            <div style={{ marginBottom: '10px' }}>
              <strong>Timeframe:</strong> {prediction.timeframe || '1 day'}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <strong>Model:</strong> {prediction.model_used || 'AI Model'}
            </div>

            {prediction.recommendation && (
              <div style={{ marginBottom: '10px' }}>
                <strong>Recommendation:</strong> 
                <span style={{ 
                  color: prediction.recommendation === 'Buy' ? 'green' : 
                        prediction.recommendation === 'Sell' ? 'red' : 'orange',
                  marginLeft: '5px',
                  fontWeight: 'bold'
                }}>
                  {prediction.recommendation}
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setPrediction(null)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Generate New Prediction
          </button>
        </div>
      )}

      {/* Debug info */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        Current Stock: {symbol || 'None selected'}
      </div>
    </div>
  );
};

export default PredictionPanel;
