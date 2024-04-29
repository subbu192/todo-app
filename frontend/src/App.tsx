import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import Loading from './components/Loading';

import AuthLayout from './components/auth/AuthLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forget from './components/auth/Forget';
import { Provider } from 'react-redux';
import { store } from './state/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function App() {
    let persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path='auth' element={<AuthLayout />}>
                                <Route index element={<Login />} />
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                                <Route path='forget' element={<Forget />} />
                            </Route>
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}