// import styles from "../common/styles"
// import { useState } from "react";


// const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section }) => {

//     const [isChecked, setIsChecked] = useState(false);

//     const handleCheckboxChange = () => {
//         setIsChecked(!isChecked);
//     };



//     return (
//         <div className="section-list-item-container">
//             {section === 'kids' && (
//                 <>
//                     <div className="section-list-item-group">
//                         <h5>Name: {data.title} {data.fullLegalName}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         <h5>Address: {data.fullAddress}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         <h5>Date of birth: {data.dob}</h5>
//                     </div>
//                 </>
//             )}
//             {section === 'assetDistribution-people' && (
//                 <>
//                     <div className="section-list-item-group">
//                         <h5>Name: {data.title} {data.fullLegalName}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         <h5>Address: {data.fullAddress}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         <h5>Date of birth: {data.dob}</h5>
//                     </div>
//                     <div>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={isChecked}
//                                 onChange={handleCheckboxChange}
//                             />
//                             Check me
//                         </label>
//                         {isChecked && (
//                             <>
//                                 <p>share</p>
//                                 <input type="text" style={{ display: 'block', marginTop: '10px' }} />
//                             </>
//                         )}
//                     </div>
//                 </>
//             )}

//             {section === 'assets' && (
//                 <>
//                     <div className="section-list-item-group">
//                         <h5>Asset Type: {data.assetType}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         {data.assetType === 'Property' && <h5>Address: {data.propertyAddress}</h5>}
//                         {data.assetType === 'Bank Account' && <h5>Bank Name: {data.bankName}</h5>}
//                         {data.assetType === 'Stocks and shares' && <h5>Company Name: {data.companyName}</h5>}
//                         {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && <h5>Provider: {data.provider}</h5>}
//                         {data.assetType === 'Other' && <h5>Details: {data.otherAssetDetails}</h5>}
//                     </div>
//                 </>
//             )}
//             {section === 'assetsDistribution-asset' && (
//                 <>
//                     <div className="section-list-item-group">
//                         <h5>Asset Type: {data.assetType}</h5>
//                     </div>
//                     <div className="section-list-item-group">
//                         {data.assetType === 'Property' && <h5>Address: {data.propertyAddress}</h5>}
//                         {data.assetType === 'Bank Account' && <h5>Bank Name: {data.bankName}</h5>}
//                         {data.assetType === 'Stocks and shares' && <h5>Company Name: {data.companyName}</h5>}
//                         {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && <h5>Provider: {data.provider}</h5>}
//                         {data.assetType === 'Other' && <h5>Details: {data.otherAssetDetails}</h5>}
//                     </div>

//                 </>
//             )}

//             {/* {(section !== 'assetsDistribution-asset' 
//             && section !== 'assetsDistribution-people')
//              && (
//                 <>
//                     <div className="section-list-item-btns-container">
//                         <button
//                             className="section-list-item-btn"
//                             style={buttonsDisabled ? styles.disabledButton : {}}
//                             disabled={buttonsDisabled}
//                             onClick={onEdit}
//                         >Edit
//                         </button>
//                         <button
//                             className="section-list-item-btn"
//                             style={buttonsDisabled ? styles.disabledButton : {}}
//                             disabled={buttonsDisabled}
//                             onClick={onRemove}
//                         >Remove</button>
//                     </div>
//                 </>
//             )} */}

//             {section !== 'assetsDistribution-asset' && section !== 'assetsDistribution-people' && (
//                 <div className="section-list-item-btns-container">
//                     <button
//                         className="section-list-item-btn"
//                         style={buttonsDisabled ? styles.disabledButton : {}}
//                         disabled={buttonsDisabled}
//                         onClick={onEdit}
//                     >Edit
//                     </button>
//                     <button
//                         className="section-list-item-btn"
//                         style={buttonsDisabled ? styles.disabledButton : {}}
//                         disabled={buttonsDisabled}
//                         onClick={onRemove}
//                     >Remove</button>
//                 </div>
//             )}
//         </div>
//     )
// }


// export default SectionListItem;







import styles from "../common/styles";
import { useState } from "react";

const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

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
            {section === 'assetDistribution-people' && (
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
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            Beneficiary
                        </label>
                        {isChecked && (
                            <>
                                <p>share</p>
                                <input type="text" style={{ display: 'block', marginTop: '10px' }} />
                            </>
                        )}
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
                        {data.assetType === 'Stocks and shares' && <h5>Company Name: {data.companyName}</h5>}
                        {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && <h5>Provider: {data.provider}</h5>}
                        {data.assetType === 'Other' && <h5>Details: {data.otherAssetDetails}</h5>}
                    </div>
                </>
            )}
            {section === 'assetsDistribution-asset' && (
                <>
                    <div className="section-list-item-group">
                        <h5>Asset Type: {data.assetType}</h5>
                    </div>
                    <div className="section-list-item-group">
                        {data.assetType === 'Property' && <h5>Address: {data.propertyAddress}</h5>}
                        {data.assetType === 'Bank Account' && <h5>Bank Name: {data.bankName}</h5>}
                        {data.assetType === 'Stocks and shares' && <h5>Company Name: {data.companyName}</h5>}
                        {(data.assetType === 'Pension' || data.assetType === 'Life insurance') && <h5>Provider: {data.provider}</h5>}
                        {data.assetType === 'Other' && <h5>Details: {data.otherAssetDetails}</h5>}
                    </div>
                </>
            )}
            {(section !== 'assetsDistribution-asset' && section !== 'assetDistribution-people') && (
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
                    >Remove
                    </button>
                </div>
            )}
        </div>
    )
}

export default SectionListItem;
