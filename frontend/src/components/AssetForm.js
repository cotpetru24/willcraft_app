import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";
import { reset } from "../features/people/peopleSlice";

const AssetForm = ({ type, role }) => {
    const dispatch = useDispatch();
    const orderAssets = useSelector(state => state.order.entities.asset);

    const [orderAsset, setOrderAsset] = useState({
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        role: ''
    });

    // useEffect(() => {
    //     const assetData = orderAssets.find(p => p.role === role);
    //     if (assetData) {
    //         setOrderAsset(assetData);
    //     }
    // }, [orderAssets, role]);

    const handlePlaceSelected = (place) => {
        setOrderAsset({
            ...orderAsset,
            fullAddress: place.formatted_address
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderAsset({
            ...orderAsset,
            [name]: value
        });
    };

    const titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Hon'];

    return (
        <div className="section-container">
            <section className="form person-form">
                <form>
                    <div className="title-and-fullName-container">
                        <p>asset type</p>
                        <div className="date-group">
                            <label htmlFor="title">Title</label>
                            <select
                                id="title"
                                name="title"
                                value={orderAsset.title}
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
                                value={orderAsset.fullLegalName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullAddress">Full address</label>
                        <AddressAutocomplete
                            name="fullAddress"
                            value={orderAsset.fullAddress}
                            onPlaceSelected={handlePlaceSelected}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <DateInput
                            name="dob"
                            value={orderAsset.dob}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email (optional)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={orderAsset.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tel">Phone Number (optional)</label>
                        <input
                            type="tel"
                            id="tel"
                            name="tel"
                            value={orderAsset.tel}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AssetForm;
