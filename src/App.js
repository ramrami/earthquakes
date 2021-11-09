import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Earthquake from './components/Earthquake/Earthquake';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <div className="App bg-gray-100 w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earthquake/:earthquakeId" element={<Earthquake />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
