import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";



const KidsTile = () => {


    const navigate = useNavigate();

    const [spouseOrPartnerInitialData, setSpouseOrPartnerInitialData] = useState({
        spouseOrPartnerTitle: '',
        spouseOrPartnerLegalName: '',
        spouseOrPartnerDob: '',
        spouseOrPartnerFullAddress: ''
    });

    const spouseOrPartnerData = useSelector(state => state.spouseOrPartner);

    const isSpouseOrPartnerComplete = (data) => {
        return data.title && data.fullLegalName && data.dob && data.fullAddress;

        //-------------to add here check if testtator is single => !maried || !partner
    };
    const allNecessaryFieldsSpecified = isSpouseOrPartnerComplete(spouseOrPartnerData);


    useEffect(() => {
        if (spouseOrPartnerData) {
            setSpouseOrPartnerInitialData({
                spouseOrPartnerTitle: spouseOrPartnerData.title || '',
                spouseOrPartnerLegalName: spouseOrPartnerData.fullLegalName || '',
                spouseOrPartnerDob: spouseOrPartnerData.dob || '',
                spouseOrPartnerFullAddress: spouseOrPartnerData.fullAddress || '',
            });
        }
    }, [spouseOrPartnerData]);

    return (
        <>
            <section >

                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>Your children</h2>
                        {allNecessaryFieldsSpecified ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ) : (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}

                    </div>

                    {allNecessaryFieldsSpecified ? (
                        <>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4 >Name:</h4>
                                </div>
                                <p>{spouseOrPartnerInitialData.spouseOrPartnerTitle} {spouseOrPartnerInitialData.spouseOrPartnerLegalName}</p>
                            </div>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4>Date of birth:</h4>
                                </div>
                                <p>{spouseOrPartnerInitialData.spouseOrPartnerDob}</p>
                            </div>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4>Address:</h4>
                                </div>
                                <p>{spouseOrPartnerInitialData.spouseOrPartnerFullAddress}</p>
                            </div>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/kids')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tell us about your spouse or partner…</p>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/kids')}>Get Started</button>
                            </div>
                        </>
                    )}
                </div>

            </section>
        </>
    );
}

export default KidsTile;
