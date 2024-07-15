import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icon-css/css/flag-icons.min.css";
import CountrySelect from "./CountrySelect";
import { useDispatch, useSelector } from "react-redux";
import { updateTestator } from "../features/order/orderSlice";
import AddressAutocomplete from "./AddressAutocomplete";




const Testator = ({ onNext }) => {



    const handlePlaceSelected = (place) => {
        console.log('Selected place: ', place);
    };



    const dispatch = useDispatch();
    const people = useSelector(state => state.order.entities.people);

    const [testator, setTestator] = useState({
        fullName: '',
        address: '',
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

    const isFieldValid = (field) => field && field.trim() !== '';


    return (
        <>
            <div className="section-container">
                <section className="creating-order-heading">
                    <h1>Personal information</h1>
                </section>
                <section className="form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="fullName">Full legal name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={testator.fullName}
                                onChange={handleInputChange}
                                required
                                className={isFieldValid(testator.fullName) ? 'input-valid' : 'input-invalid'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Full address</label>
                            <AddressAutocomplete
                                name="address"
                                value={testator.address}
                                handleInputChange={handleInputChange}
                                onPlaceSelected={handlePlaceSelected}
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
                                className={isFieldValid(testator.postcode) ? 'input-valid' : 'input-invalid'}

                            /><br />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email (optional)</label>
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
                            <label htmlFor="tel">Phone Number (optional)</label>

                            <input
                                type="tel"
                                id="tel"
                                name="tel"
                                value={testator.tel}
                                onChange={handleInputChange}
                                required

                            /><br />
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
                                    className={isFieldValid(testator.postcode) ? 'input-valid' : 'input-invalid'}

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
                                    className={isFieldValid(testator.maritalStatus) ? 'input-valid' : 'input-invalid'}
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
