import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SpouseOrPartnerTile = () => {
    const navigate = useNavigate();

    const [spouseOrPartnerInitialData, setSpouseOrPartnerInitialData] = useState({
        spouseOrPartnerTitle: '',
        spouseOrPartnerLegalName: '',
        spouseOrPartnerDob: '',
        spouseOrPartnerFullAddress: ''
    });

    const spouseOrPartnerData = useSelector(state => state.spouseOrPartner);
    const testatorData = useSelector(state => state.testator);

    const isSpouseOrPartnerComplete = (data) => {
        return data.title && data.fullLegalName && data.dob && data.fullAddress;
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
            <section>
                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>Your spouse or partner</h2>
                        {allNecessaryFieldsSpecified || testatorData.maritalStatus === 'single' || testatorData.maritalStatus === 'widowed' ? (                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ) : (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}
                    </div>

                    {allNecessaryFieldsSpecified ? (
                        <>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4>Name:</h4>
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
                                <button className="creatingOrder-tile-btn" 
                                onClick={() => navigate('/spouseOrPartner')}
                                
                                >Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            {testatorData.maritalStatus === 'single' ? (
                                <p>Your marital status is single.</p>
                            ) : testatorData.maritalStatus === 'widowed' ? (
                                <p>Your marital status is widowed.</p>
                            ) : (
                                <>
                                    <p>Tell us about your spouse or partner…</p>
                                    <div className="creatingOrder-tile-btn-container">
                                        <button className="creatingOrder-tile-btn" 
                                        onClick={() => navigate('/spouseOrPartner')}
                                        disabled={!allNecessaryFieldsSpecified && !isTestatorSingleOrWidowed}
                                        >Get Started</button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
}

export default SpouseOrPartnerTile;
