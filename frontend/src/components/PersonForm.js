
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";

const PersonForm = ({ role, formData, handleInputChange, handlePlaceSelected }) => {
  const people = useSelector(state => state.people);

  useEffect(() => {
    const personData = Object.values(people).find(p => p.role === role);
    if (personData) {
      handleInputChange({ target: { name: 'title', value: personData.title } });
      handleInputChange({ target: { name: 'fullLegalName', value: personData.fullLegalName } });
      handleInputChange({ target: { name: 'fullAddress', value: personData.fullAddress } });
      handleInputChange({ target: { name: 'dob', value: personData.dob } });
      handleInputChange({ target: { name: 'email', value: personData.email } });
      handleInputChange({ target: { name: 'tel', value: personData.tel } });
    }
  }, [people, role, handleInputChange]);

  const titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Hon'];

  return (
    <div className="section-container">
      <section className="form person-form">
        <div className="title-and-fullName-container">
          <div className="date-group">
            <label htmlFor="title">Title</label>
            <select
              id="title"
              name="title"
              value={formData.title}
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
              value={formData.fullLegalName}
              onChange={handleInputChange}
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
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <DateInput
            value={formData.dob}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email (optional)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Phone Number (optional)</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleInputChange}
          />
        </div>
      </section>
    </div>
  );
}

export default PersonForm;
