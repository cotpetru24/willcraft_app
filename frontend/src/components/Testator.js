import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icon-css/css/flag-icons.min.css";
import CountrySelect from "./CountrySelect";
import { useDispatch, useSelector } from "react-redux";
import { updateTestator } from "../features/order/orderSlice";

const Testator = ({ onNext }) => {
  const dispatch = useDispatch();
  const people = useSelector(state => state.order.entities.people);

  const [testator, setTestator] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: '',
    dob: '',
    email: '',
    tel: '',
    gender: '',
    maritalStatus: '',
    role: 'testator'
  });

  const [countryPhoneCode, setPhone] = useState(""); // Initialize the phone state here

  useEffect(() => {
    if (people.testator) {
      setTestator(people.testator);
    }
  }, [people]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedTestator = { ...testator, [name]: value };
    setTestator(updatedTestator);
    dispatch(updateTestator(updatedTestator));
  };

//   const handlePhoneChange = (phone) => {
//     setPhone(phone);
//     const updatedTestator = { ...testator, tel: phone };
//     setTestator(updatedTestator);
//     dispatch(updateTestator(updatedTestator));
//   };




const handleCountryChange = (country) => {
    const updatedTestator = { ...testator, country };
    setTestator(updatedTestator);
    dispatch(updateTestator(updatedTestator));
  };

  const handleNext = () => {
    onNext(testator);
  };

  return (
    <>
      <div className="section-container">
        <section className="creating-order-heading">
          <h1>Personal information</h1>
        </section>
        <section className="form">
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={testator.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={testator.middleName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={testator.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address1">Address</label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={testator.address1}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address2">Address 2:</label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={testator.address2}
                onChange={handleInputChange}
              />
            </div>
            <div className="address-group">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={testator.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group postcode">
                <label htmlFor="postcode">Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={testator.postcode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <CountrySelect
                name="country"
                value={testator.country}
                // onChange={(country) => handleInputChange({ target: { name: 'country', value: country } })}
                onChange={handleCountryChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={testator.dob}
                onChange={handleInputChange}
                required
              /><br />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={testator.email}
                onChange={handleInputChange}
                required
              /><br />
            </div>

            <div className="form-group">
              <label htmlFor="tel">Phone Number</label>
              <div className="tel-group">
                <PhoneInput
                  country={'gb'}
                  value={countryPhoneCode}
                  onChange={handleInputChange}
                  inputProps={{
                    name: 'countryPhoneCode',
                    required: true,
                    autoFocus: false
                  }}
                />
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  value={testator.tel}
                  onChange={handleInputChange}
                  required
                /><br />
              </div>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={testator.gender === 'male'}
                  onChange={handleInputChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={testator.gender === 'female'}
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="form-group">
              <label>Marital Status</label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="married"
                  name="maritalStatus"
                  value="married"
                  checked={testator.maritalStatus === 'married'}
                  onChange={handleInputChange}
                />
                <label htmlFor="married">Married</label>
              </div>
              <div className="radio-group">
                <input
                  type="radio"
                  id="single"
                  name="maritalStatus"
                  value="single"
                  checked={testator.maritalStatus === 'single'}
                  onChange={handleInputChange}
                />
                <label htmlFor="single">Single</label>
              </div>
            </div>
            <button type="button" onClick={handleNext}>Next</button>
          </form>
        </section>

        <section className="form spouse-form-container">
          <button>+ Add spouse or partner</button>
        </section>

        <section className="form children-form-container">
          <button>+ Add child</button>
        </section>
      </div>
    </>
  );
}

export default Testator;