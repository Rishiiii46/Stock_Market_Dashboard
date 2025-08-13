import React, { useState } from 'react';
import './StockList.css';

const StockList = ({ companies, selectedStock, onStockSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company =>
    company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-list">
      <h3>Companies</h3>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="companies-list">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            className={`company-item ${selectedStock?.id === company.id ? 'selected' : ''}`}
            onClick={() => onStockSelect(company)}
          >
            <div className="company-symbol">{company.symbol}</div>
            <div className="company-name">{company.company_name}</div>
            {company.sector && (
              <div className="company-sector">{company.sector}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;