import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";



const TestatorTile = () => {


    const navigate = useNavigate();

    const [testatorInitialData, setTestatorInitialData] = useState({
        testatorTitle: '',
        testatorFullLegalName: '',
        testatorDob: '',
        testatorFullAddress: ''
    });

    const testatorData = useSelector(state => state.testator);

    const isTestatorDataComplete = (data) => {
        return data.title && data.fullLegalName && data.dob && data.fullAddress;
    };
    const allNecessaryFieldsSpecified = isTestatorDataComplete(testatorData);


    useEffect(() => {
        if (testatorData) {
            setTestatorInitialData({
                testatorTitle: testatorData.title || '',
                testatorFullLegalName: testatorData.fullLegalName || '',
                testatorDob: testatorData.dob || '',
                testatorFullAddress: testatorData.fullAddress || '',
            });
        }
    }, [testatorData]);

    return (
        <>
            <section >

                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>About you</h2>
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
                                <p>{testatorInitialData.testatorTitle} {testatorInitialData.testatorFullLegalName}</p>
                            </div>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4>Date of birth:</h4>
                                </div>
                                <p>{testatorInitialData.testatorDob}</p>
                            </div>
                            <div className="creatingOrder-tile-group">
                                <div className="creatingOrder-tile-line-heading">
                                    <h4>Address:</h4>
                                </div>
                                <p>{testatorInitialData.testatorFullAddress}</p>
                            </div>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/testator')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tell us a little bit about yourself…</p>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/testator')}>Get Started</button>
                            </div>
                        </>
                    )}
                </div>

            </section>
        </>
    );
}

export default TestatorTile;
