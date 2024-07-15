import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Testator from './components/Testator';
import Spouse from './components/Spouse';
import Executor from './components/Executor';
import Assets from './components/Assets';
import Beneficiaries from './components/Beneficiaries';
import AssetDistribution from './components/AssetDistribution';
import OrderReview from './components/OrderReview';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from './components/ProgressBar';
import AboutUs from './components/AboutUs';
import Dashboard from './components/Dashboard';
import OrderNavigation from './components/OrderNavigation';
import AddressAutocomplete from './components/AddressAutocomplete';

function App() {


  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          {/* <ProgressBar/> */}
          <Routes>
            <Route path='/' element={<Home />} />;
            <Route path='/login' element={<Login />} />;
            <Route path='/register' element={<Register />} />;
            <Route path='/testator' element={<Testator />} />;
            <Route path='/spouse' element={<Spouse />} />;
            <Route path='/executor' element={<Executor />} />;
            <Route path='/assets' element={<Assets />} />;
            <Route path='/beneficiaries' element={<Beneficiaries />} />;
            <Route path='/assetDistribution' element={<AssetDistribution />} />;
            <Route path='/orderReview' element={<OrderReview />} />;
            <Route path='/progressBar' element={<ProgressBar />} />;
            <Route path='/aboutus' element={<AboutUs/>}/>;
            <Route path='/dashboard' element={<Dashboard/>}/>;
            <Route path='/creatingOrder' element={<OrderNavigation/>}/>;
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
