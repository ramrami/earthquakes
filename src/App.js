import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Earthquake from './components/Earthquake';
import NotFound from './components/NotFound';
import CheckEarthquake from './components/CheckEarthquake';

function App() {
  return (
    <div className="bg-gray-100 w-full h-full">      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earthquakes/:earthquakeId" element={<Earthquake />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CheckEarthquake />
    </div>
  );
}

export default App;
