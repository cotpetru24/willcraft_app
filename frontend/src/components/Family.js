import React, { useState } from "react";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "flag-icon-css/css/flag-icons.min.css";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import PersonForm from "./PersonForm";
import { useNavigate } from "react-router-dom";
import OrderNavigation from "./OrderNavigation";


const Family = () => {
    const navigate = useNavigate()








const handleBack = ()=>{
    navigate('/spouseOrPartner')
}

const handleSaveAndContinue = ()=>{
    console.log('saved the family sectio')
navigate('/creatingOrder')
}

    const handleCancel = () => {
        // Logic specific to Family when cancel is clicked
        setShowChildForm(false);
    };

    const handleSave = () => {
        // Logic specific to Family when save is clicked
        console.log("Child form saved");
        setShowChildForm(false);
        // Dispatch actions or perform any other operations here
    };

    const [showChildForm, setShowChildForm] = useState(false)
    const maritalStatus = useSelector((state) => state.testator.maritalStatus)
    const spouseOrPartner = useSelector((state) => state.spouseOrPartner)
    const children = useSelector((state) => state.children.children)

    const handleAddChildClick = () => {
        setShowChildForm(true);
    };

    return (
        <>
            <div className="family-section-container">
                <section className="creating-order-heading">
                    <h1>Your Family</h1>
                </section>
                <section className="family-select">
                    <div className="family-group">
                        <div>
                            <h3>Your marital Status: {maritalStatus}</h3>
                        </div>
                        <div>
                            <h3>Spouse</h3>
                            <ListItem
                                name={spouseOrPartner.fullLegalName || ""}
                                dob={spouseOrPartner.dob || ""}
                                address={spouseOrPartner.fullAddress || ""}
                            />
                        </div>
                        <div>
                            <h3>Children</h3>
                            {children.map((child, index) => (
                                <ListItem
                                    key={index}
                                    name={child.fullLegalName || ""}
                                    dob={child.dob || ""}
                                    address={child.fullAddress || ""}
                                />
                            ))}
                        </div>
                        <div>
                            {showChildForm ? (
                                <PersonForm
                                    role='children'
                                    initialFormData={''}
                                    onCancel={handleCancel}
                                    onSave={handleSave}
                                // onSubmit={onSubmit}
                                />
                            ) : (
                                <button onClick={handleAddChildClick}>+ Add Children</button>
                            )}
                            <div />

                            {/* <button onclick={handleAddChildClick}>+ Add Children</button> */}
                        </div>
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                        />
                    </div>
                </section>



            </div>

        </>
    );
}

export default Family