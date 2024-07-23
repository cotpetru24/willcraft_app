import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";

const PersonForm = ({ role, initialFormData, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const order = useSelector(state => state.order);

  useEffect(() => {
    const personData = order.peopleAndRoles.find(p => p.role.includes(role));
    if (personData) {
      const { personId } = personData;
      setFormData({
        _id: personId._id || '',
        title: personId.title || '',
        fullLegalName: personId.fullLegalName || '',
        fullAddress: personId.fullAddress || '',
        dob: personId.dob || '',
        email: personId.email || '',
        tel: personId.tel || ''
      });
    }
  }, [order, role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePlaceSelected = (place) => {
    setFormData({
      ...formData,
      fullAddress: place.formatted_address || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const titles = ['', 'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Rev', 'Hon'];

  return (
    <form onSubmit={handleSubmit}>
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
          <div className="creatingOrder-section-navigation-container">
            <button type="submit">Save and continue</button>
          </div>
        </section>
      </div>
    </form>
  );
}

export default PersonForm;
