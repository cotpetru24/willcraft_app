import styles from "../common/styles"

// const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit }) => {
//     return (
//         <div className="section-list-item-container">
//             <div className="section-list-item-group">
//                 <h5>Name: {data.title} {data.fullLegalName}</h5>
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
//                     onClick={onEdit}
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



const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section }) => {
    return (
        <div className="section-list-item-container">
            {section === 'kids' && (
                <>
                    <div className="section-list-item-group">
                        <h5>Name: {data.title} {data.fullLegalName}</h5>
                    </div>
                    <div className="section-list-item-group">
                        <h5>Address: {data.fullAddress}</h5>
                    </div>
                    <div className="section-list-item-group">
                        <h5>Date of birth: {data.dob}</h5>
                    </div>
                </>
            )}
            {section === 'assets' && (
                <>
                    <div className="section-list-item-group">
                        <h5>Asset Type: {data.assetType}</h5>
                    </div>
                    <div className="section-list-item-group">
                        {data.assetType === 'Property' && <h5>Address: {data.propertyAddress}</h5>}
                        {data.assetType === 'Bank Account' && <h5>Bank Name: {data.bankName}</h5>}
                        {data.assetType === 'Stocks and Shares' && <h5>Company Name: {data.companyName}</h5>}
                        {(data.assetType === 'Pension' || data.assetType === 'Life Insurance') && <h5>Provider: {data.provider}</h5>}
                        {data.assetType === 'Other' && <h5>Details: {data.otherAssetDetails}</h5>}
                    </div>
                </>
            )}
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