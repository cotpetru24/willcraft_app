import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const KidsTile = () => {
    const navigate = useNavigate();

    const testator = useSelector(state => state.testator)
    const kidsData = useSelector(state => state.kids);

    const isKidsComplete = (data) => {
        return testator.hasChildrenStatus === 'no' || (Array.isArray(data) && (data.length > 0))
    };

    const allNecessaryFieldsSpecified = isKidsComplete(kidsData);


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
                            {kidsData.map((kid, index) => (
                                <div className="creatingOrder-tile-list-container" key={index}>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Name:</h4>
                                        </div>
                                        <p>{kid.title} {kid.fullLegalName}</p>
                                    </div>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Date of birth:</h4>
                                        </div>
                                        <p>{kid.dob}</p>
                                    </div>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Address:</h4>
                                        </div>
                                        <p>{kid.fullAddress}</p>
                                    </div>
                                </div>
                            ))}

                            {testator.hasChildrenStatus === "no" && (
                                <p>You said you don't have children</p>
                            )}

                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/kids')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tell us about your children…</p>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/kids')}>Get Started</button>
                            </div>
                        </>
                    )}
                </div>
            </section >
        </>
    );
}

export default KidsTile;
