import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Testator from './components/Testator';
import Executor from './components/Executor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from './components/ProgressBar';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import OrderNavigation from './components/OrderNavigation';
import AddressAutocomplete from './components/AddressAutocomplete';
import CreatingOrder from './components/CreatingOrder';
import PersonForm from './components/PersonForm';
import AssetForm from './components/AssetForm';
import Prices from './components/Prices';
import SpouseOrPartner from './components/SpouseOrPartner';
import Family from './components/Family';


function App() {


  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />;
            <Route path='/login' element={<Login />} />;
            <Route path='/register' element={<Register />} />;
            <Route path='/testator' element={<Testator />} />;
            <Route path='/family' element={<Family />} />;
            <Route path='/executors' element={<Executor />} />;
            <Route path='/progressBar' element={<ProgressBar />} />;
            <Route path='/aboutus' element={<AboutUs />} />;
            <Route path='/dashboard' element={<Dashboard />} />;
            <Route path='/creatingOrder' element={<CreatingOrder />} />;
            <Route path='/assets' element={<AssetForm />} />
            <Route path='/prices' element={<Prices />} />;
            <Route path='/spouseOrPartner' element={<SpouseOrPartner />} />;
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
