import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';

function App() {
    return (
    <AuthProvider>
    <Router>
        <Routes>
            <Route path='/home' element={<Home />} 
            />
            <Route path='/auth' element={
            <AuthenticatedRoute>
                <Auth />
            </AuthenticatedRoute>
            } 
            />
            <Route path='/settings' element={
            <ProtectedRoute>
                <Settings />
            </ProtectedRoute> 
            } 
            />
            <Route path='*' element={<Home />} 
            />
        </Routes>
    </Router>
    </AuthProvider>
    )
}

export default App;