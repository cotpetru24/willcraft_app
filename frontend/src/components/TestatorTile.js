import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TestatorTile = () => {
    const navigate = useNavigate();

    const [testatorInitialData, setTestatorInitialData] = useState({
        testatorTitle: '',
        testatorFullLegalName: '',
        testatorDob: '',
        testatorFullAddress: ''
    });

    const order = useSelector(state => state.order);

    const testatorData = order.peopleAndRoles.find(p => p.roles.includes("testator"));

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
            <section className="creatingOrder-container">
                <div className="creatingOrder-tiles-and-instructions-container">
                    <div className="creatingOrder-tiles">
                        {/*  -----Testator tile ------ */}
                        <div className="creatingOrder-tile">
                            <div>
                                <h2>About you</h2>
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
                                    <p>Please enter your details</p>
                                    <button onClick={() => navigate('/testator')}>Get Started</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TestatorTile;
