import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icon-css/css/flag-icons.min.css";
import CountrySelect from "./CountrySelect";
import ProgressBar from "./ProgressBar";



const Testator = () => {
    const [countryPhoneCode, setPhone] = useState(""); // Initialize the phone state here

    return (
        <>
        <ProgressBar/>
            <div className="section-container">
                <section className="creating-order-heading">
                    <h1>Personal information</h1>
                </section>
                <section className="form">
                    <form action="/submit" method="post">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="middleName">Middle Name</label>
                            <input type="text" id="middleName" name="middleName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address1">Address</label>
                            <input type="text" id="address1" name="address1" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address2">Address 2:</label>
                            <input type="text" id="address2" name="address2" required />
                        </div>
                        <div className="address-group">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" required />
                            </div>
                            <div className="form-group postcode">
                                <label htmlFor="postcode">Postcode</label>
                                <input type="text" id="postcode" name="postcode" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <CountrySelect />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input type="date" id="dob" name="dob" required /><br />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required /><br />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tel">Phone Number</label>
                            <div className="tel-group">
                                <PhoneInput
                                    country={'gb'}
                                    value={countryPhoneCode}
                                    onChange={countryPhoneCode => setPhone(countryPhoneCode)}
                                    inputProps={{
                                        name: 'countryPhoneCode',
                                        required: true,
                                        autoFocus: false
                                    }}

                                />
                                <input type="tel" id="tel" name="tel" required /><br />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Gender</label>
                            <div className="radio-group">
                                <input type="radio" id="male" name="gender" value="male" />
                                <label htmlFor="male">Male</label>
                            </div>
                            <div className="radio-group">
                                <input type="radio" id="female" name="gender" value="female" />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Marital Status</label>
                            <div className="radio-group">
                                <input type="radio" id="married" name="marital-status" value="married" />
                                <label htmlFor="married">Married</label>
                            </div>
                            <div className="radio-group">
                                <input type="radio" id="single" name="marital-status" value="single" />
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
