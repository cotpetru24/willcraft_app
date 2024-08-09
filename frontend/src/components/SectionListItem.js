




import styles from "../common/styles";
import { useState, useEffect } from "react";

const SectionListItem = ({ buttonsDisabled, data, onRemove, onEdit, section, onChecked, asset, onChange, assetIndex }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [receivingAmount, setReceivingAmount] = useState('');



    useEffect(() => {
        if (data.role && data.role.includes("executor")) {
            setIsChecked(true);
        }

        // if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
        //     const isInDistribution = asset.distribution.some(dist => dist.personId._id === data._id);
        //     setIsChecked(isInDistribution);


        //     if (isInDistribution) {
        //         const currentAmount = asset.distribution.find(dist => dist.personId._id === data._id)?.receivingAmount || '';
        //         setReceivingAmount(currentAmount);
        //     }

        // }


        if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
            const isInDistribution = asset.distribution.some(dist => dist.personId._id === data._id);
            setIsChecked(isInDistribution);
    
            if (isInDistribution) {
                const currentAmount = asset.distribution.find(dist => dist.personId._id === data._id)?.receivingAmount || '';
                setReceivingAmount(currentAmount);
            }
        }
        

////////// ---------------this works fine -------don't delete until fullly tested

        // if (section === 'assetDistribution-additionalBeneficiary' && asset?.distribution) {
        //     const isInDistribution = asset.distribution.some(dist => dist.personId?._id === data._id);
        //     setIsChecked(isInDistribution);
        // }


        if (section === 'assetDistribution-beneficiary' && asset?.distribution) {
            const distribution = asset.distribution.find(dist => dist.personId._id === data._id);
    
            if (distribution) {
                setIsChecked(true);
                setReceivingAmount(distribution.receivingAmount || '');
            } else {
                setIsChecked(false);
                setReceivingAmount('');
            }
        }

        // if (section === 'assetDistribution-additionalBeneficiary' && asset) {
        //     const isInDistribution = asset.distribution.some(dist => dist.personId && dist.personId._id && dist.personId._id === data._id);
        //     setIsChecked(isInDistribution);
        //     console.log(`data passed to seclion list item = ${JSON.stringify(data)}`)
        // }
    }, [data.role, section, data._id]);

    const currentReceivingAmount = asset?.distribution?.find(dist => dist.personId._id === data._id)?.receivingAmount || '';

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        console.log(`section item => Checkbox state changing to: ${newCheckedState} for person: ${data.fullLegalName}`);
        setIsChecked(newCheckedState);
        onChecked(newCheckedState);  // Pass the new checked state to the callback
    };



    const handleAmountChange = (event) => {
        const value = event.target.value;
        setReceivingAmount(value);
        onChange(value, assetIndex, data._id); // Pass the value, assetIndex, and data._id to the parent
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
            {section === 'assetDistribution-beneficiary' && (
                <>
                    {/* {console.log(`family person assets distribution = ${JSON.stringify(data)}`)} */}

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
                                <p>Share</p>
                                <input
                                    type="text"
                                    value={receivingAmount} // Bind the input value to the receivingAmount state
                                    style={{ display: 'block', marginTop: '10px' }}
                                    onChange={handleAmountChange} // Handle the change event
                                />
                            </>
                        )}
                    </div>
                </>
            )}
            {section === 'assetDistribution-additionalBeneficiary' && (
                <>
                    {/* {console.log(`family person assets distribution = ${JSON.stringify(data)}`)} */}

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
            {section === 'executors' && (
                <>
                    <div className="section-list-item-group">
                        <h5>Name: {data.personId.title} {data.personId.fullLegalName}</h5>
                    </div>
                    <div className="section-list-item-group">
                        <h5>Address: {data.personId.fullAddress}</h5>
                    </div>
                    <div className="section-list-item-group">
                        <h5>Date of birth: {data.personId.dob}</h5>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            // onChecked={onChecked}
                            />
                            Executor
                        </label>
                    </div>
                </>
            )}
            {section === 'additional-executors' && (
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
            {(section !== 'assetsDistribution-asset' && section !== 'assetDistribution-beneficiary' && section !== 'executors') && (
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
    );
}

export default SectionListItem;
