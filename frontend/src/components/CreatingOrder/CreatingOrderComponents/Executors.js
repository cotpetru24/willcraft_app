import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/order/currentOrderSlice";
import { createPerson } from "../../../features/people/peopleService";
import { createKidThunk } from "../../../features/people/kids/kidsThunks";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"
import { Button } from 'react-bootstrap'
import { removeExecutorSlice, updateExecutorsSlice } from "../../../features/executors/executorsSlice";
import { createExecutorThunk, updateExecutorThunk } from "../../../features/executors/executorsThunks";


const Executors = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);


    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries)
    const executors = useSelector(state => state.executors)

    const [family, setFamily] = useState([]);

    useEffect(() => {
        const updatedFamily = currentOrder.peopleAndRoles
            .filter(p => p.role.includes('partner') || p.role.includes('kid') || p.role.includes('spouse'));
        setFamily(updatedFamily);
    }, [currentOrder.peopleAndRoles, currentOrder]);
    
    const [showExecutorForm, setShowExecutorForm] = useState(false);
    const [editExecutorIndex, setEditExecutorIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedExecutorsData = useRef(null);
    const savedCurrentOrderData = useRef(null);

    let executor;

    const [executorFormData, setExecutorFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: ''
    });



    useEffect(() => {
        if (executor) {
            setExecutorFormData({
                _id: executorFormData._id || '',
                title: executorFormData.title || '',
                fullLegalName: executorFormData.fullLegalName || '',
                fullAddress: executorFormData.fullAddress || '',
                dob: executorFormData.dob || '',
                email: executorFormData.email || '',
                tel: executorFormData.tel || ''
            })
        }
        // Store the initial state as "saved" state if it's not already saved
        if (!savedExecutorsData.current) {
            savedExecutorsData.current = JSON.parse(JSON.stringify(executors));
        }
        if (!savedCurrentOrderData.current){
            savedCurrentOrderData.current=JSON.parse(JSON.stringify(currentOrder))
        }
    }, [executors]);


    const handleShowExecutorForm = () => {
        setShowExecutorForm(prevState => !prevState);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setExecutorFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleExecutorFormAdd = (e) => {
        e.preventDefault();

        if (editExecutorIndex !== null) {
            const updatedExecutors = executors.map((executor, index) =>
                index === editExecutorIndex ? executorFormData : executor
            );
            dispatch(updateExecutorsSlice(updatedExecutors));
            setEditExecutorIndex(null); // Reset the edit index
        } else {
            dispatch(updateExecutorsSlice([...executors, executorFormData]));
        }

        resetExecutorForm();
        setShowExecutorForm(false);
    };

    const resetExecutorForm = () => {
        setExecutorFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: ''

        });
        setEditExecutorIndex(null); // Reset the edit index
    };

    const handleRemoveExecutor = (index) => {
        const updatedExecutors = executors.filter((_, i) => i !== index);
        dispatch(updateExecutorsSlice(updatedExecutors));
    };

    const handleEditExecutor = (index) => {
        const executorToEdit = executors[index];
        setExecutorFormData({
            _id: executorToEdit._id || '',
            title: executorToEdit.title || '',
            fullLegalName: executorToEdit.fullLegalName || '',
            fullAddress: executorToEdit.fullAddress || '',
            dob: executorToEdit.dob || '',
            email: executorToEdit.email || '',
            tel: executorToEdit.tel || ''
        });
        setEditExecutorIndex(index); // Set the edit index
        setShowExecutorForm(true);
    };













    const handleSaveAndContinue = async (e) => {
        e.preventDefault();
        const updatedOrder = { ...currentOrder }
        await dispatch(updateOrderThunk(updatedOrder));

        const updatedExecutors = [];
        for (const executor of executors) {
            let response;
            if (executor._id) {
                response = await dispatch(updateExecutorThunk(executor)).unwrap();
            } else {
                response = await dispatch(createExecutorThunk(executor)).unwrap();
            }
            updatedExecutors.push({
                ...executor,
                _id: response._id
            });
        }


        // Update kids slice with new kids including their IDs
        await dispatch(updateExecutorsSlice(updatedExecutors));

        // Prepare updated order with the new kids IDs
        const updatedOrderWithIds = {
            ...currentOrder,
            peopleAndRoles: [
                ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes(constants.role.ADDITIONAL_EXECUTOR)), // Remove existing kids to avoid duplicates
                ...updatedExecutors.map(executor => ({
                    personId: executor._id,
                    role: [constants.role.ADDITIONAL_EXECUTOR]
                }))
            ]
        };


        

        // Update the currentOrder slice
        await dispatch(updateCurrentOrderSlice(updatedOrderWithIds));
        // Update the order in the backend
        await dispatch(updateOrderThunk(updatedOrderWithIds));

        navigate('/creatingOrder');
    };






    const handleBack = () => {
        console.log(`handle back called`);
        // Revert to the "saved" state

        if (savedExecutorsData.current) {
            dispatch(updateExecutorsSlice(savedExecutorsData.current));
            console.log(`dispatched update executors slice`);
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
            console.log(`dispatched update current order slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setExecutorFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };


    const [familyExecutors, setFamilyExecutors] = useState([]);


    const handleExecutorChecked = (index, isChecked) => {
        const familyExecutor = family[index];

        const updatedPeopleAndRoles = currentOrder.peopleAndRoles.map(personRole => {
            if (personRole.personId._id === familyExecutor.personId._id) {
                if (isChecked) {
                    // Add the executor role if it doesn't already exist
                    return {
                        ...personRole,
                        role: personRole.role.includes('executor') ? personRole.role : [...personRole.role, 'executor']
                    };
                } else {
                    // Remove the executor role
                    return {
                        ...personRole,
                        role: personRole.role.filter(role => role !== 'executor')
                    };
                }
            }
            return personRole;
        });

        dispatch(updateCurrentOrderSlice({ ...currentOrder, peopleAndRoles: updatedPeopleAndRoles }));
    };





    return (
        <>
            <section className="section-container">
                <div>
                    <div className="creatingOrder-section-heading-container">
                        <h1>Executors</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Please select or/and add the executors of the will.</h4>
                        </div>
                    </div>
                </div>

                <>
                    <div>
                        <div className="section-content-container">
                            <div className="section-controll-container">
                                <div className="section-list-container">
                                    {family.map((person, personIndex) => (
                                        <SectionListItem
                                            key={`person-${personIndex}`}
                                            buttonsDisabled={showExecutorForm}
                                            data={person}
                                            onRemove={() => handleRemoveExecutor(personIndex)}
                                            onEdit={() => handleEditExecutor(personIndex)}
                                            onChecked={(isChecked) => handleExecutorChecked(personIndex, isChecked)}  // Pass the checkbox state
                                            section="executors"
                                        />

                                    ))}

                                </div>




                                <div className="section-list-container">
                                    <h3>additional executors</h3>
                                    {executors.map((person, personIndex) => (
                                        <SectionListItem
                                            key={`person-${personIndex}`}
                                            buttonsDisabled={showExecutorForm}
                                            data={person}
                                            onRemove={() => handleRemoveExecutor(personIndex)}
                                            onEdit={() => handleEditExecutor(personIndex)}
                                            onChecked={(isChecked) => handleExecutorChecked(personIndex, isChecked)}  // Pass the checkbox state
                                            section="additional-executors"
                                        />

                                    ))}

                                </div>





                                <div className="sectio-add-btn-container">
                                    <button
                                        className="section-add-btn"
                                        onClick={handleShowExecutorForm}
                                        style={showExecutorForm ? styles.disabledButton : {}}
                                        disabled={showExecutorForm}
                                    >
                                        +Add Executor
                                    </button>
                                </div>

                            </div>

                        </div>

                        {showExecutorForm &&
                            (
                                <div className="section-form-container">
                                    <form onSubmit={handleExecutorFormAdd}>
                                        <div className="form-main-container">
                                            <div className="form-title-and-fullName-container">
                                                <div className="name-group">
                                                    <label htmlFor="title">Title</label>
                                                    <select
                                                        id="title"
                                                        name="title"
                                                        value={executorFormData.title}
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
                                                        value={executorFormData.fullLegalName}
                                                        onChange={handleOnChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fullAddress">Full address</label>
                                                <AddressAutocomplete
                                                    name="fullAddress"
                                                    value={executorFormData.fullAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dob">Date of Birth</label>
                                                <DateInput
                                                    id="dob"
                                                    name="dob"
                                                    value={executorFormData.dob}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email (optional)</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={executorFormData.email}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tel">Phone Number (optional)</label>
                                                <input
                                                    type="tel"
                                                    id="tel"
                                                    name="tel"
                                                    value={executorFormData.tel}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-btns-container">
                                            <button
                                                className="form-btn"
                                                type="button"
                                                onClick={() => {
                                                    handleShowExecutorForm();
                                                    resetExecutorForm();
                                                }}
                                            >Cancel</button>
                                            <button
                                                className="form-btn"
                                                type="submit"
                                            >{editExecutorIndex !== null ? "Update" : "Add"}</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </>
                {/* )
                } */}
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showExecutorForm}
                        />
                    </div>
                    <div className="section-list-container">
                        <h3>Selected Executors</h3>
                        {familyExecutors.map((executor, executorIndex) => (
                            <div key={executorIndex}>
                                <p>{executor.fullLegalName}</p>
                                <p>{executor.role}</p>
                            </div>
                        ))}
                    </div>
                </>
            </section >
        </>
    )
}

export default Executors;

