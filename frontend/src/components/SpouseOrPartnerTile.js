import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";



const SpouseOrPartnerTile = () => {


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
                        <h2>Your spouse or partner</h2>
                        {allNecessaryFieldsSpecified ?(
                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ):(
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}

                    </div>

                    {allNecessaryFieldsSpecified ? (
                        <>
                            <div>
                                <h4>Name:</h4> <p>{spouseOrPartnerInitialData.spouseOrPartnerTitle} {spouseOrPartnerInitialData.spouseOrPartnerLegalName}</p>
                            </div>
                            <div>
                                <h4>Date of birth:</h4> <p>{spouseOrPartnerInitialData.spouseOrPartnerDob}</p>
                            </div>
                            <div>
                                <h4>Address:</h4> <p>{spouseOrPartnerInitialData.spouseOrPartnerFullAddress}</p>
                            </div>
                            <div>
                                <button onClick={() => navigate('/spouseOrPartner')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tell us about your spouse or partner…</p>
                            <button onClick={() => navigate('/spouseOrPartner')}>Get Started</button>
                        </>
                    )}
                </div>

            </section>
        </>
    );
}

export default SpouseOrPartnerTile;
