import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import RecoverPassword from './pages/RecoverPassword';
import CsvManagerPage from './pages/CsvManager';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SaibaMais from "../src/pages/LearnMore";
import TableView from './pages/TableView';

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
            <Route path='/recover/:token' element={<RecoverPassword />} 
            />
            <Route path='*' element={<Home />} 
            />
            <Route path='/csv' element={<CsvManagerPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path="/saiba-mais" element={<SaibaMais />} />
            <Route path="/dashboard/table" element={<TableView />} />
        </Routes>
    </Router>
    </AuthProvider>
    )
}

export default App;