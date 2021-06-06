import React from 'react';
import './App.css';
import OrderBook from "./features/orderbook/OrderBook";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <OrderBook />
      </header>
    </div>
  );
}

export default App;
