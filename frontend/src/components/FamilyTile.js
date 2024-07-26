import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import SpouseOrPartner from "./SpouseOrPartner";



const FamilyTile = () => {
    const navigate = useNavigate();

    const [spouseOrPartnerInitialData, setspouseOrPartnerInitialData] = useState({
        spouseOrPartnerTitle: '',
        spouseOrPartnerFullLegalName: '',
        spouseOrPartnerDob: '',
        spouseOrPartnerFullAddress: ''
    });

    const spouseOrPartnerData = useSelector(state => state.spouseOrPartner);

    const isSpouseDataComplete = (data) => {
        return data.spouseOrPartnerData && data.spouseOrPartnerFullLegalName && data.spouseOrPartnerDob && data.spouseOrPartnerFullAddress;
    };
    const allNecessaryFieldsSpecified = isSpouseDataComplete(spouseOrPartnerData);



    useEffect(() => {
        if (spouseOrPartnerData) {
            // const { personId } = spouseOrPartnerData;
            setspouseOrPartnerInitialData({
                spouseOrPartnerTitle: spouseOrPartnerData.title || '',
                spouseOrPartnerFullLegalName: spouseOrPartnerData.fullLegalName || '',
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
                        <h2>Your Family</h2>
                        {allNecessaryFieldsSpecified ?(
                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ):(
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}

                    </div>

                    {allNecessaryFieldsSpecified ? (
                        <>
                            <div>
                                <h4>Name:</h4> <p>{spouseOrPartnerInitialData.spouseOrPartnerTitle} {spouseOrPartnerInitialData.spouseOrPartnerFullLegalName}</p>
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
                            <p>Those most important to you. Your partner, children...</p>
                            {/* <button onClick={() => navigate('/spouseOrPartner')}>Get Started</button> */}
                            <button onClick={() => navigate('/family')}>Get Started</button>

                        </>
                    )}
                </div>

            </section>
        </>
    );
}

export default FamilyTile;
