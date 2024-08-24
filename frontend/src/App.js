import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index2.css'; // Import custom styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Testator from './components/CreatingOrder/CreatingOrderComponents/Testator';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import CreatingOrder from './components/CreatingOrder/CreatingOrder';
import Prices from './components/Prices';
import SpouseOrPartner from './components/CreatingOrder/CreatingOrderComponents/SpouseOrPartner';
import Kids from './components/CreatingOrder/CreatingOrderComponents/Kids';
import Assets from './components/CreatingOrder/CreatingOrderComponents/Assets';
import AssetsDistribution from './components/CreatingOrder/CreatingOrderComponents/AssetsDistribution';
import Executors from './components/CreatingOrder/CreatingOrderComponents/Executors';
import PaymentPage from './components/ChechOutForm';

function App() {


  return (
    <>
      <Router>
        <div className='container-fluid root'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />;
            <Route path='/login' element={<Login />} />;
            <Route path='/register' element={<Register />} />;
            <Route path='/aboutus' element={<AboutUs />} />;
            <Route path='/prices' element={<Prices />} />;
            <Route path='/dashboard' element={<Dashboard />} />;
            <Route path='/creatingOrder' element={<CreatingOrder />} />;
            <Route path='/testator' element={<Testator />} />;
            <Route path='/spouseOrPartner' element={<SpouseOrPartner />} />;
            <Route path='/kids' element={<Kids />} />;
            <Route path='/assets' element={<Assets />} />;
            <Route path='/assetsDistribution' element={<AssetsDistribution />} />;
            <Route path='/executors' element={<Executors />} />;
            <Route path='/ChechOutForm' element={<PaymentPage />} />

          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
