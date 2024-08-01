// import OrderNavigation from "../CreatigOrderNavigation";
// import constants from "../../../common/constants";
// import AddressAutocomplete from "../../Common/AddressAutocomplete";
// import DateInput from "../../Common/DateInput";
// import SectionListItem from "../../SectionListItem";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
// import { useState, useRef, useEffect } from "react";
// import testatorThunks from "../../../features/people/testator/testatorThunks";
// import { resetKidsSlice, updateKidsSlice } from "../../../features/people/kids/kidsSlice";
// import styles from "../../../common/styles";

// const Kids = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const testator = useSelector(state => state.testator);
//     const currentOrder = useSelector(state => state.currentOrder);
//     const kids = useSelector(state => state.kids);

//     const [showKidsForm, setShowKidsForm] = useState(false);
//     const [currentHasChildrenStatus, setHasChildrenStatus] = useState(testator.hasChildrenStatus);
//     const [editKidIndex, setEditKidIndex] = useState(null); // New state to track the index of the kid being edited

//     // Use useRef to store the "saved" state
//     const savedKidsData = useRef(null);
//     const savedTestatorData = useRef(null);
//     const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);

//     let kid;

//     const [kidFormData, setKidFormData] = useState({
//         _id: '',
//         title: '',
//         fullLegalName: '',
//         fullAddress: '',
//         dob: '',
//         email: '',
//         tel: ''
//     });



//     useEffect(() => {
//         if (kid) {
//             setKidFormData({
//                 _id: kidFormData._id || '',
//                 title: kidFormData.title || '',
//                 fullLegalName: kidFormData.fullLegalName || '',
//                 fullAddress: kidFormData.fullAddress || '',
//                 dob: kidFormData.dob || '',
//                 email: kidFormData.email || '',
//                 tel: kidFormData.tel || ''
//             })
//         }
//         // Store the initial state as "saved" state if it's not already saved
//         if (!savedTestatorData.current) {
//             savedTestatorData.current = JSON.parse(JSON.stringify(testator));
//         }
//         if (!savedKidsData.current) {
//             savedKidsData.current = JSON.parse(JSON.stringify(kids));
//         }
//     }, [kids]);

//     const handleHasChildrenStatusChange = (e) => {
//         setShowKidsForm(prevState => false);



//         const updatedHasChildrenStatus = e.target.value;
//         setHasChildrenStatus(updatedHasChildrenStatus);

//         if (testator) {
//             dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }));
//         }
//         if (kids) {
//             dispatch(resetKidsSlice())
//         }
//     };


//     const handleShowKidsForm = () => {
//         setShowKidsForm(prevState => !prevState);
//     };


//     const handleOnChange = (e) => {
//         const { name, value } = e.target;
//         setKidFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };


//     // const handleKidFormAdd = (e) => {
//     //     e.preventDefault();

//     //     dispatch(updateKidsSlice([...kids, kidFormData]));
//     // };


//     const handleKidFormAdd = (e) => {
//         e.preventDefault();

//         if (editKidIndex !== null) {
//             const updatedKids = kids.map((kid, index) => 
//                 index === editKidIndex ? kidFormData : kid
//             );
//             dispatch(updateKidsSlice(updatedKids));
//             setEditKidIndex(null); // Reset the edit index
//         } else {
//             dispatch(updateKidsSlice([...kids, kidFormData]));
//         }

//         resetKidForm();
//         setShowKidsForm(false);
//     };



//     const resetKidForm = () => {
//         setKidFormData({
//             title: '',
//             fullLegalName: '',
//             fullAddress: '',
//             dob: '',
//             email: '',
//             tel: ''
//         });
//     };

//     const handleRemoveKid = (index) => {
//         const updatedKids = kids.filter((_, i) => i !== index);
//         dispatch(updateKidsSlice(updatedKids));
//     };



//     const handleEditKid = (index) => {
//         const kidToEdit = kids[index];
//         setKidFormData({
//             _id: kidToEdit._id || '',
//             title: kidToEdit.title || '',
//             fullLegalName: kidToEdit.fullLegalName || '',
//             fullAddress: kidToEdit.fullAddress || '',
//             dob: kidToEdit.dob || '',
//             email: kidToEdit.email || '',
//             tel: kidToEdit.tel || ''
//         });
//         setShowKidsForm(true);
//     };
    





//     const handleSaveAndContinue = async (e) => {
//         e.preventDefault();
//         // Update testator's hasChildrenStatus if it has changed
//         if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
//             await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
//         }
//         navigate('/creatingOrder');
//     };


//     const handleBack = () => {
//         console.log(`handle back called`);
//         // Revert to the "saved" state
//         if (savedTestatorData.current) {
//             dispatch(updateTestatorSlice(savedTestatorData.current));
//             console.log(`dispatched update testator slice`);
//         }
//         if (savedKidsData.current) {
//             dispatch(updateKidsSlice(savedKidsData.current));
//             console.log(`dispatched update kids slice`);
//         }
//         navigate('/creatingOrder');
//     };


//     const handlePlaceSelected = (address) => {
//         setKidFormData((prevData) => ({
//             ...prevData,
//             fullAddress: address
//         }));
//     };

//     return (
//         <>
//             <section className="section-container">
//                 <div>
//                     <div className="creatingOrder-section-heading-container">
//                         <h1>Your Children</h1>
//                     </div>
//                     <div className="has-children-container">
//                         <div>
//                             <h4>Do you have children ?</h4>
//                         </div>
//                         <div className="has-children-options-container">
//                             <div className="has-children-radio-container">
//                                 <input
//                                     type="radio"
//                                     id="has-children-yes"
//                                     name="has-children"
//                                     value="yes"
//                                     checked={currentHasChildrenStatus === "yes"}
//                                     onChange={handleHasChildrenStatusChange}
//                                 >
//                                 </input>
//                                 <label htmlFor="has-children-yes">Yes</label>
//                             </div>
//                             <div className="has-children-radio-container">
//                                 <input
//                                     type="radio"
//                                     id="has-children-no"
//                                     name="has-children"
//                                     value="no"
//                                     checked={currentHasChildrenStatus === "no"}
//                                     onChange={handleHasChildrenStatusChange}
//                                 >
//                                 </input>
//                                 <label htmlFor="has-children-no">No</label>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {(currentHasChildrenStatus === "yes") &&
//                     (
//                         <>
//                             <div className="section-content-container">
//                                 <div className="section-controll-container">
//                                     <div className="section-list-container">
//                                         {/* <SectionListItem
//                                             buttonsDisabled={showKidsForm}
//                                         />
//                                         <SectionListItem
//                                             buttonsDisabled={showKidsForm}
//                                         /> */}
//                                         {kids.map((kid, index) => (
//                                             <SectionListItem
//                                                 key={index}
//                                                 buttonsDisabled={showKidsForm}
//                                                 data={kid}
//                                                 onRemove={()=>handleRemoveKid(index)}
//                                                 onEdit={() => handleEditKid(index)}                                            />
//                                         ))}
//                                     </div>
//                                     <div className="sectio-add-btn-container">
//                                         <button
//                                             className="section-add-btn"
//                                             onClick={handleShowKidsForm}
//                                             style={showKidsForm ?
//                                                 styles.disabledButton : {}}
//                                             disabled={showKidsForm}
//                                         >
//                                             +Add children</button>
//                                     </div>
//                                 </div>

//                                 {(showKidsForm) &&
//                                     (
//                                         <div className="section-form-container">
//                                             <form onSubmit={handleKidFormAdd}>
//                                                 <div className="form-main-container">
//                                                     <div className="form-title-and-fullName-container">
//                                                         <div className="name-group">
//                                                             <label htmlFor="title">Title</label>
//                                                             <select
//                                                                 id="title"
//                                                                 name="title"
//                                                                 value={kidFormData.title}
//                                                                 onChange={handleOnChange}
//                                                                 required
//                                                             >
//                                                                 {Object.values(constants.title).map((title, index) => (
//                                                                     <option key={index} value={title}>
//                                                                         {title}
//                                                                     </option>
//                                                                 ))}
//                                                             </select>
//                                                         </div>
//                                                         <div className="name-group">
//                                                             <label htmlFor="fullLegalName">Full legal name</label>
//                                                             <input
//                                                                 type="text"
//                                                                 className="fullLegalName"
//                                                                 id="fullLegalName"
//                                                                 name="fullLegalName"
//                                                                 value={kidFormData.fullLegalName}
//                                                                 onChange={handleOnChange}
//                                                                 required
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <div className="form-group">
//                                                         <label htmlFor="fullAddress">Full address</label>
//                                                         <AddressAutocomplete
//                                                             name="fullAddress"
//                                                             value={kidFormData.fullAddress}
//                                                             onPlaceSelected={handlePlaceSelected}
//                                                             handleInputChange={handleOnChange}
//                                                         />
//                                                     </div>
//                                                     <div className="form-group">
//                                                         <label htmlFor="dob">Date of Birth</label>
//                                                         <DateInput
//                                                             id="dob"
//                                                             name="dob"
//                                                             value={kidFormData.dob}
//                                                             onChange={handleOnChange}
//                                                         />
//                                                     </div>
//                                                     <div className="form-group">
//                                                         <label htmlFor="email">Email (optional)</label>
//                                                         <input
//                                                             type="email"
//                                                             id="email"
//                                                             name="email"
//                                                             value={kidFormData.email}
//                                                             onChange={handleOnChange}
//                                                         />
//                                                     </div>
//                                                     <div className="form-group">
//                                                         <label htmlFor="tel">Phone Number (optional)</label>
//                                                         <input
//                                                             type="tel"
//                                                             id="tel"
//                                                             name="tel"
//                                                             value={kidFormData.tel}
//                                                             onChange={handleOnChange}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="form-btns-container">
//                                                     <button className="form-btn"
//                                                         onClick={() => {
//                                                             handleShowKidsForm();
//                                                             resetKidForm();
//                                                         }}
//                                                     >Cancel</button>
//                                                     <button
//                                                         className="form-btn"
//                                                         onClick={(e) => {
//                                                             handleKidFormAdd(e);
//                                                             handleShowKidsForm();
//                                                             resetKidForm();
//                                                         }}
//                                                     >Add</button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     )
//                                 }
//                             </div>
//                         </>
//                     )
//                 }
//                 <>
//                     <div className="section-navigation-container">
//                         <OrderNavigation
//                             onBack={handleBack}
//                             onSaveAndContinue={handleSaveAndContinue}
//                             buttonsDisabled={showKidsForm}
//                         />
//                     </div>
//                 </>
//             </section>
//         </>
//     )
// }

// export default Kids;




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
import { resetKidsSlice, updateKidsSlice } from "../../../features/people/kids/kidsSlice";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/order/currentOrderSlice";
import { createPerson } from "../../../features/people/peopleService";

const Kids = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const testator = useSelector(state => state.testator);
    const currentOrder = useSelector(state => state.currentOrder);
    const kids = useSelector(state => state.kids);

    const [showKidsForm, setShowKidsForm] = useState(false);
    const [currentHasChildrenStatus, setHasChildrenStatus] = useState(testator.hasChildrenStatus);
    const [editKidIndex, setEditKidIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedKidsData = useRef(null);
    const savedTestatorData = useRef(null);
    const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);

    let kid;

    const [kidFormData, setKidFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: ''
    });

    useEffect(() => {
        if (kid) {
            setKidFormData({
                _id: kidFormData._id || '',
                title: kidFormData.title || '',
                fullLegalName: kidFormData.fullLegalName || '',
                fullAddress: kidFormData.fullAddress || '',
                dob: kidFormData.dob || '',
                email: kidFormData.email || '',
                tel: kidFormData.tel || ''
            })
        }
        // Store the initial state as "saved" state if it's not already saved
        if (!savedTestatorData.current) {
            savedTestatorData.current = JSON.parse(JSON.stringify(testator));
        }
        if (!savedKidsData.current) {
            savedKidsData.current = JSON.parse(JSON.stringify(kids));
        }
    }, [kids]);

    const handleHasChildrenStatusChange = (e) => {
        setShowKidsForm(false);

        const updatedHasChildrenStatus = e.target.value;
        setHasChildrenStatus(updatedHasChildrenStatus);

        if (testator) {
            dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }));
        }
        if (kids) {
            dispatch(resetKidsSlice());
        }
    };

    const handleShowKidsForm = () => {
        setShowKidsForm(prevState => !prevState);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setKidFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleKidFormAdd = (e) => {
        e.preventDefault();

        if (editKidIndex !== null) {
            const updatedKids = kids.map((kid, index) =>
                index === editKidIndex ? kidFormData : kid
            );
            dispatch(updateKidsSlice(updatedKids));
            setEditKidIndex(null); // Reset the edit index
        } else {
            dispatch(updateKidsSlice([...kids, kidFormData]));
        }

        resetKidForm();
        setShowKidsForm(false);
    };

    const resetKidForm = () => {
        setKidFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: ''
        });
        setEditKidIndex(null); // Reset the edit index
    };

    const handleRemoveKid = (index) => {
        const updatedKids = kids.filter((_, i) => i !== index);
        dispatch(updateKidsSlice(updatedKids));
    };

    const handleEditKid = (index) => {
        const kidToEdit = kids[index];
        setKidFormData({
            _id: kidToEdit._id || '',
            title: kidToEdit.title || '',
            fullLegalName: kidToEdit.fullLegalName || '',
            fullAddress: kidToEdit.fullAddress || '',
            dob: kidToEdit.dob || '',
            email: kidToEdit.email || '',
            tel: kidToEdit.tel || ''
        });
        setEditKidIndex(index); // Set the edit index
        setShowKidsForm(true);
    };

    const updatedOrder = {
        ...currentOrder,
        peopleAndRoles: [
            ...currentOrder.peopleAndRoles.filter(pr => pr.role !== constants.role.KID), // Remove existing kids to avoid duplicates
            ...kids.map(kid => ({
                personId: kid._id,
                role: [constants.role.KID]
            }))
        ]
    };
    


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();
        // Update testator's hasChildrenStatus if it has changed
        if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
            await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
        }


await dispatch(createPerson)

        await dispatch(updateCurrentOrderSlice(updatedOrder));
        await dispatch(updateOrderThunk(updatedOrder));

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

    const handlePlaceSelected = (address) => {
        setKidFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
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
                                        {kids.map((kid, index) => (
                                            <SectionListItem
                                                key={index}
                                                buttonsDisabled={showKidsForm}
                                                data={kid}
                                                onRemove={() => handleRemoveKid(index)}
                                                onEdit={() => handleEditKid(index)}
                                            />
                                        ))}
                                    </div>
                                    <div className="sectio-add-btn-container">
                                        <button
                                            className="section-add-btn"
                                            onClick={handleShowKidsForm}
                                            style={showKidsForm ? styles.disabledButton : {}}
                                            disabled={showKidsForm}
                                        >
                                            +Add children
                                        </button>
                                    </div>
                                </div>

                                {showKidsForm &&
                                    (
                                        <div className="section-form-container">
                                            <form onSubmit={handleKidFormAdd}>
                                                <div className="form-main-container">
                                                    <div className="form-title-and-fullName-container">
                                                        <div className="name-group">
                                                            <label htmlFor="title">Title</label>
                                                            <select
                                                                id="title"
                                                                name="title"
                                                                value={kidFormData.title}
                                                                onChange={handleOnChange}
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
                                                                value={kidFormData.fullLegalName}
                                                                onChange={handleOnChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="fullAddress">Full address</label>
                                                        <AddressAutocomplete
                                                            name="fullAddress"
                                                            value={kidFormData.fullAddress}
                                                            onPlaceSelected={handlePlaceSelected}
                                                            handleInputChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="dob">Date of Birth</label>
                                                        <DateInput
                                                            id="dob"
                                                            name="dob"
                                                            value={kidFormData.dob}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email (optional)</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={kidFormData.email}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="tel">Phone Number (optional)</label>
                                                        <input
                                                            type="tel"
                                                            id="tel"
                                                            name="tel"
                                                            value={kidFormData.tel}
                                                            onChange={handleOnChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-btns-container">
                                                    <button
                                                        className="form-btn"
                                                        type="button"
                                                        onClick={() => {
                                                            handleShowKidsForm();
                                                            resetKidForm();
                                                        }}
                                                    >Cancel</button>
                                                    <button
                                                        className="form-btn"
                                                        type="submit"
                                                    >{editKidIndex !== null ? "Update" : "Add"}</button>
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

