import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
    <AuthProvider>
    <Router>
        <Routes>
            <Route path='/home' element={<Home />} 
            />
            <Route path='/auth' element={<Auth />} 
            />
            <Route path='*' element={<Home />} 
            />
        </Routes>
    </Router>
    </AuthProvider>
    )
}

export default App;