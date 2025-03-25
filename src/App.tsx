import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './components/home/Home';

function App() {
    return (
    <Router>
        <Routes>
            <Route path='/teste' element={<Home />} 
            />
            <Route path='*' element={<Home />} 
            />
        </Routes>
    </Router>
    )
}

export default App;