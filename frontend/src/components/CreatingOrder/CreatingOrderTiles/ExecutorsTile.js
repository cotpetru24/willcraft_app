// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


// const ExecutorsTile = () => {
//     const navigate = useNavigate();

//     const executorsData = useSelector(state => state.executors)

//     const isExecutorsComplete = (data) => {
//         return (Array.isArray(data) && (data.length > 0))
//     };

//     const allNecessaryFieldsSpecified = isExecutorsComplete(executorsData);


//     return (
//         <>
//             <section >
//                 <div className="creatingOrder-tile">
//                     <div className="creatingOrder-tile-heading">
//                         <h2>Executors</h2>
//                         {allNecessaryFieldsSpecified ? (
//                             <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
//                         ) : (
//                             <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
//                         )}
//                     </div>

//                     {allNecessaryFieldsSpecified ? (
//                         <>
//                             {executorsData.map((executor, index) => (<>
//                                 <div className="creatingOrder-tile-list-container" key={index}>
//                                     <div className="creatingOrder-tile-group">
//                                         <div className="creatingOrder-tile-line-heading">
//                                             <h4>Name:</h4>
//                                         </div>
//                                         <p>{executor.title} {executor.fullLegalName}</p>
//                                     </div>
//                                     <div className="creatingOrder-tile-group">
//                                         <div className="creatingOrder-tile-line-heading">
//                                             <h4>Date of birth:</h4>
//                                         </div>
//                                         <p>{executor.dob}</p>
//                                     </div>
//                                     <div className="creatingOrder-tile-group">
//                                         <div className="creatingOrder-tile-line-heading">
//                                             <h4>Address:</h4>
//                                         </div>
//                                         <p>{executor.fullAddress}</p>
//                                     </div>
//                                 </div>

//                             </>
//                             ))}
//                             <div className="creatingOrder-tile-btn-container">
//                                 <button className="creatingOrder-tile-btn" onClick={() => navigate('/executors')}>Edit</button>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <p>Tell us about executors…</p>
//                             <div className="creatingOrder-tile-btn-container">
//                                 <button className="creatingOrder-tile-btn" onClick={() => navigate('/executors')}>Get Started</button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </section >
//         </>
//     );
// }

// export default ExecutorsTile;





import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const ExecutorsTile = () => {
    const navigate = useNavigate();

    const executorsData = useSelector(state => state.executors)
    const currentOrder = useSelector(state=>state.currentOrder)

    const family = currentOrder.peopleAndRoles
    .filter(p => p.role.includes('partner') || p.role.includes('kid') || p.role.includes('spouse'))

    const isExecutorsComplete = (data) => {
        return (Array.isArray(data) && (data.length > 0))
    };

    const allNecessaryFieldsSpecified = isExecutorsComplete(executorsData);

    return (
        <>
            <section >
                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>Executors</h2>
                        {allNecessaryFieldsSpecified ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ) : (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}
                    </div>

                    {allNecessaryFieldsSpecified ? (
                        <>
                            {executorsData.map((executor, index) => (
                                <div className="creatingOrder-tile-list-container" key={index}>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Name:</h4>
                                        </div>
                                        <p>{executor.title} {executor.fullLegalName}</p>
                                    </div>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Date of birth:</h4>
                                        </div>
                                        <p>{executor.dob}</p>
                                    </div>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Address:</h4>
                                        </div>
                                        <p>{executor.fullAddress}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/executors')}>Edit</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tell us about executors…</p>
                            <div className="creatingOrder-tile-btn-container">
                                <button className="creatingOrder-tile-btn" onClick={() => navigate('/executors')}>Get Started</button>
                            </div>
                        </>
                    )}
                </div>
            </section >
        </>
    );
}

export default ExecutorsTile;
