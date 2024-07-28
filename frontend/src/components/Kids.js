import OrderNavigation from "./OrderNavigation"
import constants from "../common/constants"
import AddressAutocomplete from "./AddressAutocomplete"
import DateInput from "./DateInput"

const handleKidsFormSave =()=>{

}


export const Kids = () => {

    return (
        <>
            <section className="section-container">

                <div className="section-heading-container">
                    <h1>Your Children</h1>
                </div>
                <div className="section-content-container">
                    <div className="section-controll-container">
                        <div className="section-list-container">
                            <ul>
                                <li>
                                    <div className="section-list-item-container">
                                        <div className="section-list-item-gropu">
                                            <h5>Child Name Here: Name Test</h5>
                                        </div>
                                        <div className="section-list-item-gropu">
                                            <h5>Child Address Here: Address Test</h5>
                                        </div>
                                        <div className="section-list-item-gropu">
                                            <h5>Child date of birth Here: 01/01/1900</h5>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="section-list-item-container">
                                        <div className="section-list-item-gropu">
                                            <h5>Child Name Here: Name Test</h5>
                                        </div>
                                        <div className="section-list-item-gropu">
                                            <h5>Child Address Here: Address Test</h5>
                                        </div>
                                        <div className="section-list-item-gropu">
                                            <h5>Child date of birth Here: 01/01/1900</h5>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="sectio-add-btn-container">
                            <button className="section-add-btn"> +Add children</button>
                        </div>
                    </div>

                    <div className="section-form-container">
                        <form onSubmit={handleKidsFormSave}>
                            <div className="form-main-container">
                                <div className="form-title-and-fullName-container">
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <select
                                            id="title"
                                            name="title"
                                            // value={formData.title}
                                            // onChange={handleOnChange}
                                            required
                                        >
                                            {constants.titles.map(title => (
                                                <option key={title} value={title}>
                                                    {title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fullLegalName">Full legal name</label>
                                        <input
                                            type="text"
                                            id="fullLegalName"
                                            name="fullLegalName"
                                            // value={formData.fullLegalName}
                                            // onChange={handleOnChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fullAddress">Full address</label>
                                    <AddressAutocomplete
                                        name="fullAddress"
                                    // value={formData.fullAddress}
                                    // onPlaceSelected={handlePlaceSelected}
                                    // handleInputChange={handleOnChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob">Date of Birth</label>
                                    <DateInput
                                        id="dob"
                                        name="dob"
                                    // value={formData.dob}
                                    // onChange={handleOnChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email (optional)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                    // value={formData.email}
                                    // onChange={handleOnChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel">Phone Number (optional)</label>
                                    <input
                                        type="tel"
                                        id="tel"
                                        name="tel"
                                    // value={formData.tel}
                                    // onChange={handleOnChange}
                                    />
                                </div>
                            </div>
                            <div className="form-btns-container">
                                <button className="form-btn">Cancel</button>
                                <button className="form-btn">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="section-navigation-container">
                    <OrderNavigation />
                </div>

            </section>
        </>
    )

} 

export default Kids