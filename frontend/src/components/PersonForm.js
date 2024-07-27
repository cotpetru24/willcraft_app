import React, { useState, useEffect } from "react";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";
import { useSelector, useDispatch } from "react-redux";
import { updateTestatorSlice } from "../features/people/testatorSlice";

const PersonForm = ({ role, onSave }) => {
  const dispatch = useDispatch();
  const formDataFromState = useSelector((state) => state[role]);

  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  useEffect(() => {
    if (formDataFromState) {
      setFormData({
        _id: formDataFromState._id || '',
        title: formDataFromState.title || '',
        fullLegalName: formDataFromState.fullLegalName || '',
        fullAddress: formDataFromState.fullAddress || '',
        dob: formDataFromState.dob || '',
        email: formDataFromState.email || '',
        tel: formDataFromState.tel || ''
      });
    }
  }, [formDataFromState]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...formData, [name]: value }));
  };

  const handlePlaceSelected = (place) => {
    setFormData({
      ...formData,
      fullAddress: place.formatted_address || ''
    });

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...formData, fullAddress: place.formatted_address || '' }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData, role);
  };

  const titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Hon'];

  return (
    <form onSubmit={handleSave}>
      <div className="section-container">
        <section className="form person-form">
          <div className="title-and-fullName-container">
            <div className="date-group">
              <label htmlFor="title">Title</label>
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={handleOnChange}
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
                value={formData.fullLegalName}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="fullAddress">Full address</label>
            <AddressAutocomplete
              name="fullAddress"
              value={formData.fullAddress}
              onPlaceSelected={handlePlaceSelected}
              handleInputChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <DateInput
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email (optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Phone Number (optional)</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              value={formData.tel}
              onChange={handleOnChange}
            />
          </div>
        </section>
      </div>
    </form>
  );
}

export default PersonForm;
