// import styles from "../common/styles"

// const SectionListItem = ({buttonsDisabled}) => {
//     return (
//         <div className="section-list-item-container">
//             <div className="section-list-item-group">
//                 <h5>Child Name Here: Name Test</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Child Address Here: Address Test</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Child date of birth Here: 01/01/1900</h5>
//             </div>
//             <div className="section-list-item-btns-container">
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ?
//                         styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                 >Edit
//                 </button>
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ?
//                         styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                 >Remove</button>
//             </div>
//         </div>
//     )
// }

// export default SectionListItem










// import styles from "../common/styles"

// const SectionListItem = ({ buttonsDisabled, data }) => {
//     return (
//         <div className="section-list-item-container">
//             <div className="section-list-item-group">
//                 <h5>Name: {data.fullLegalName}</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Address: {data.fullAddress}</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Date of birth: {data.dob}</h5>
//             </div>
//             <div className="section-list-item-btns-container">
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ? styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                 >Edit
//                 </button>
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ? styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                 >Remove</button>
//             </div>
//         </div>
//     )
// }

// export default SectionListItem;



// import styles from "../common/styles"

// const SectionListItem = ({ buttonsDisabled, data, onRemove }) => {
//     return (
//         <div className="section-list-item-container">
//             <div className="section-list-item-group">
//                 <h5>Name: {data.fullLegalName}</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Address: {data.fullAddress}</h5>
//             </div>
//             <div className="section-list-item-group">
//                 <h5>Date of birth: {data.dob}</h5>
//             </div>
//             <div className="section-list-item-btns-container">
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ? styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                 >Edit
//                 </button>
//                 <button
//                     className="section-list-item-btn"
//                     style={buttonsDisabled ? styles.disabledButton : {}}
//                     disabled={buttonsDisabled}
//                     onClick={onRemove}
//                 >Remove</button>
//             </div>
//         </div>
//     )
// }

// export default SectionListItem;




import styles from "../common/styles"

const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit }) => {
    return (
        <div className="section-list-item-container">
            <div className="section-list-item-group">
                <h5>Name: {data.title} {data.fullLegalName}</h5>
            </div>
            <div className="section-list-item-group">
                <h5>Address: {data.fullAddress}</h5>
            </div>
            <div className="section-list-item-group">
                <h5>Date of birth: {data.dob}</h5>
            </div>
            <div className="section-list-item-btns-container">
                <button
                    className="section-list-item-btn"
                    style={buttonsDisabled ? styles.disabledButton : {}}
                    disabled={buttonsDisabled}
                    onClick={onEdit}
                >Edit
                </button>
                <button
                    className="section-list-item-btn"
                    style={buttonsDisabled ? styles.disabledButton : {}}
                    disabled={buttonsDisabled}
                    onClick={onRemove}
                >Remove</button>
            </div>
        </div>
    )
}

export default SectionListItem;
