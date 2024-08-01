import OrderNavigation from "../CreatigOrderNavigation"
import constants from "../../../common/constants"
import AddressAutocomplete from "../../Common/AddressAutocomplete"
import DateInput from "../../Common/DateInput"
import SectionListItem from "../../SectionListItem"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice"
import { useState, useRef } from "react"
import testatorThunks from "../../../features/people/testator/testatorThunks"




export const Kids = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const testator = useSelector(state => state.testator);
    const currentOrder = useSelector(state => state.currentOrder);


    const [currentHasChildrenStatus, setHasChildrenStatus] = useState(testator.hasChildrenStatus)

    const savedTestatorData = useRef(null);
    const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);


    const handleHasChildrenStatusChange = (e) => {
        const updatedHasChildrenStatus = e.target.value;
        setHasChildrenStatus(updatedHasChildrenStatus);

        if (testator) {
            dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }))
        }
    }



    const handleKidsFormSave = () => {

    }

    const handleSaveAndContinue = async (e) => {
        e.preventDefault();
        // Update testator's hasChildrenStatus if it has changed
        if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {

            await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
        }
        navigate('/creatingOrder');
    }


    const handleBack = () => {
        // Revert to the "saved" state
        // if (savedTestatorData.current) {
        //   dispatch(updateTestatorSlice(savedTestatorData.current));
        // }
        // if (savedSpouseOrPartnerData.current) {
        //   dispatch(updateSpouseOrPartnerSlice(savedSpouseOrPartnerData.current));
        // }
        navigate('/creatingOrder');
    };

    return (
        <>
            <section className="section-container">
                <div>
                    <div className="creatingOrder-section-heading-container">
                        <h1>Your Children</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Do you have children ?</h4>
                        </div>
                        <div className="has-children-options-container">
                            <div className="has-children-radio-container">
                                <input
                                    type="radio"
                                    id="has-children-yes"
                                    name="has-children"
                                    value="yes"
                                    checked={currentHasChildrenStatus === "yes"}
                                    onChange={handleHasChildrenStatusChange}
                                >
                                </input>
                                <label htmlFor="has-children-yes">Yes</label>
                            </div>
                            <div className="has-children-radio-container">
                                <input
                                    type="radio"
                                    id="has-children-no"
                                    name="has-children"
                                    value="no"
                                    checked={currentHasChildrenStatus === "no"}
                                    onChange={handleHasChildrenStatusChange}
                                >
                                </input>
                                <label htmlFor="has-children-no">No</label>
                            </div>
                        </div>
                    </div>
                </div>


                {(currentHasChildrenStatus === "yes") &&
                    (
                        <>
                            <div className="section-content-container">
                                <div className="section-controll-container">
                                    <div className="section-list-container">
                                        {/* <ul>
                                <li>
                                    <div className="section-list-item-container">
                                        <div className="section-list-item-group">
                                            <h5>Child Name Here: Name Test</h5>
                                        </div>
                                        <div className="section-list-item-group">
                                            <h5>Child Address Here: Address Test</h5>
                                        </div>
                                        <div className="section-list-item-group">
                                            <h5>Child date of birth Here: 01/01/1900</h5>
                                        </div>
                                        <div className="section-list-item-btns-container">
                                            <button className="section-list-item-btn">Edit</button>
                                            <button className="section-list-item-btn">Remove</button>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="section-list-item-container">
                                        <div className="section-list-item-group">
                                            <h5>Child Name Here: Name Test</h5>
                                        </div>
                                        <div className="section-list-item-group">
                                            <h5>Child Address Here: Address Test</h5>
                                        </div>
                                        <div className="section-list-item-group">
                                            <h5>Child date of birth Here: 01/01/1900</h5>
                                        </div>
                                        <div className="section-list-item-btns-container">
                                            <button className="section-list-item-btn">Edit</button>
                                            <button className="section-list-item-btn">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            </ul> */}
                                        <SectionListItem />
                                        <SectionListItem />
                                    </div>
                                    <div className="sectio-add-btn-container">
                                        <button className="section-add-btn"> +Add children</button>
                                    </div>
                                </div>

                                <div className="section-form-container">
                                    <form onSubmit={handleKidsFormSave}>
                                        <div className="form-main-container">
                                            <div className="form-title-and-fullName-container">
                                                <div className="name-group">
                                                    <label htmlFor="title">Title</label>
                                                    <select
                                                        id="title"
                                                        name="title"
                                                        // value={formData.title}
                                                        // onChange={handleOnChange}
                                                        required
                                                    >
                                                        {Object.values(constants.title).map((title, index) => (
                                                            <option key={index} value={title}>
                                                                {title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="name-group">
                                                    <label htmlFor="fullLegalName">Full legal name</label>
                                                    <input
                                                        type="text"
                                                        className="fullLegalName"
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

                        </>
                    )
                }
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                        />
                    </div>
                </>
            </section>
        </>
    )

}

export default Kids