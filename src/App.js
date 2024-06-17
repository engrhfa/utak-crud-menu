// src/App.js
import React, { useEffect } from 'react';
import MenuManager from './MenuManager';
import './App.css';
import addSampleData from './addSampleData';

function App() {
  useEffect(() => {
    addSampleData();
  }, []);

  return (
    <div className="App">
      <MenuManager />
    </div>
  );
}

export default App;
