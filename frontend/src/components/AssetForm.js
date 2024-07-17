import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";
import {reset} from "../features/people/peopleSlice";

const PersonForm = ({ role }) => {
    const dispatch = useDispatch();
    const people = useSelector(state => state.order.entities.people);

    const [person, setPerson] = useState({
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        role
    });

    useEffect(() => {
        const personData = Object.values(people).find(p => p.role === role);
        if (personData) {
            setPerson(personData);
        }
    }, [people, role]);

    const handlePlaceSelected = (place) => {
        setPerson({
            ...person,
            fullAddress: place.formatted_address
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPerson({
            ...person,
            [name]: value
        });
    };

    const titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Hon'];

    return (
        <div className="section-container">
            <section className="form person-form">
                <form>
                    <div className="title-and-fullName-container">
                        <div className="date-group">
                            <label htmlFor="title">Title</label>
                            <select
                                id="title"
                                name="title"
                                value={person.title}
                                onChange={handleInputChange}
                                required
                            >
                                {titles.map(title => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="date-group">
                            <label htmlFor="fullLegalName">Full legal name</label>
                            <input
                                type="text"
                                id="fullLegalName"
                                name="fullLegalName"
                                value={person.fullLegalName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullAddress">Full address</label>
                        <AddressAutocomplete
                            name="fullAddress"
                            value={person.fullAddress}
                            onPlaceSelected={handlePlaceSelected}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <DateInput
                            value={person.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email (optional)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={person.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tel">Phone Number (optional)</label>
                        <input
                            type="tel"
                            id="tel"
                            name="tel"
                            value={person.tel}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </form>
            </section>
        </div>
    );
}

export default PersonForm;
