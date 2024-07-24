import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";



const ExecutorsTile = () => {
    const navigate = useNavigate();

    const [testatorInitialData, setTestatorInitialData] = useState({
        testatorTitle: '',
        testatorFullLegalName: '',
        testatorDob: '',
        testatorFullAddress: ''
    });

    const order = useSelector(state => state.order);

    const testatorData = order.peopleAndRoles.find(p => p.role.includes("testator"));

    useEffect(() => {
        if (testatorData) {
            const { personId } = testatorData;
            setTestatorInitialData({
                testatorTitle: personId.title || '',
                testatorFullLegalName: personId.fullLegalName || '',
                testatorDob: personId.dob || '',
                testatorFullAddress: personId.fullAddress || '',
            });
        }
    }, [order, testatorData]);

    return (
        <>
            <section >

                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>Executors</h2>
                        {testatorData ?(
                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ):(
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}

                    </div>

                    {testatorData ? (
                        <>
                            <div>
                                <h4>Name:</h4> <p>{testatorInitialData.testatorTitle} {testatorInitialData.testatorFullLegalName}</p>
                            </div>
                            <div>
                                <h4>Date of birth:</h4> <p>{testatorInitialData.testatorDob}</p>
                            </div>
                            <div>
                                <h4>Address:</h4> <p>{testatorInitialData.testatorFullAddress}</p>
                            </div>
                            <div>
                                <button onClick={() => navigate('/testator')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Who will carry out your wishes…</p>
                            <button onClick={() => navigate('/family')}>Get Started</button>
                        </>
                    )}
                </div>

            </section>
        </>
    );
}

export default ExecutorsTile;
