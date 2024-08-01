import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import { useState, useRef, useEffect } from "react";
import testatorThunks from "../../../features/people/testator/testatorThunks";
import { updateKidsSlice } from "../../../features/people/kids/kidsSlice";
import styles from "../../../common/styles";

const Kids = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const testator = useSelector(state => state.testator);
    const currentOrder = useSelector(state => state.currentOrder);
    const kids = useSelector(state => state.kids);

    const [showKidsForm, setShowKidsForm] = useState(false);
    const [currentHasChildrenStatus, setHasChildrenStatus] = useState(testator.hasChildrenStatus);

    // Use useRef to store the "saved" state
    const savedKidsData = useRef(null);
    const savedTestatorData = useRef(null);
    const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);

    useEffect(() => {
        // Store the initial state as "saved" state if it's not already saved
        if (!savedTestatorData.current) {
            savedTestatorData.current = JSON.parse(JSON.stringify(testator));
        }
        // if (!savedKidsData.current) {
        //     savedKidsData.current = JSON.parse(JSON.stringify(kids));
        // }
    }, [kids]);

    const handleHasChildrenStatusChange = (e) => {
        setShowKidsForm(prevState => false);



        const updatedHasChildrenStatus = e.target.value;
        setHasChildrenStatus(updatedHasChildrenStatus);

        if (testator) {
            dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }));
        }
    };

    const handleShowKidsForm = () => {
        setShowKidsForm(prevState => !prevState);
    };

    const handleKidsFormAdd = () => {
        // Your implementation for adding kids
    };

    const handleSaveAndContinue = async (e) => {
        e.preventDefault();
        // Update testator's hasChildrenStatus if it has changed
        if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
            await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
        }
        navigate('/creatingOrder');
    };

    const handleBack = () => {
        console.log(`handle back called`);
        // Revert to the "saved" state
        if (savedTestatorData.current) {
            dispatch(updateTestatorSlice(savedTestatorData.current));
            console.log(`dispatched update testator slice`);
        }
        if (savedKidsData.current) {
            dispatch(updateKidsSlice(savedKidsData.current));
            console.log(`dispatched update kids slice`);
        }
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
                                        <SectionListItem
                                            buttonsDisabled={showKidsForm}
                                        />
                                        <SectionListItem
                                            buttonsDisabled={showKidsForm}
                                        />
                                    </div>
                                    <div className="sectio-add-btn-container">
                                        <button
                                            className="section-add-btn"
                                            onClick={handleShowKidsForm}
                                            style={showKidsForm ?
                                                styles.disabledButton : {}}
                                            disabled={showKidsForm}
                                        >
                                            +Add children</button>
                                    </div>
                                </div>

                                {(showKidsForm) &&
                                    (
                                        <div className="section-form-container">
                                            <form onSubmit={handleKidsFormAdd}>
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
                                                    <button className="form-btn"
                                                        onClick={handleShowKidsForm}
                                                    >Cancel</button>
                                                    <button className="form-btn">Add</button>
                                                </div>
                                            </form>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )
                }
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showKidsForm}
                        />
                    </div>
                </>
            </section>
        </>
    )
}

export default Kids;
