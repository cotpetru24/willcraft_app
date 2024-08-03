import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


const AssetsTile = () => {
    const navigate = useNavigate();

    const assetsData = useSelector(state => state.assets);

    // const isAssetsComplete = (data) => {
    //     Array.isArray(data) && (data.length > 0)
    // };

    // const allNecessaryFieldsSpecified = isAssetsComplete(assetsData);


    return (
        <>
            <section >
                <div className="creatingOrder-tile">
                    <div className="creatingOrder-tile-heading">
                        <h2>Your Assets</h2>
                        {(Array.isArray(assetsData) && (assetsData.length > 0)) ? (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                        ) : (
                            <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                        )}
                    </div>






                    {(Array.isArray(assetsData) && (assetsData.length > 0)) ? (
                        <>
                            {assetsData.map((asset, index) => (
                                <div className="creatingOrder-tile-list-container" key={index}>
                                    <div className="creatingOrder-tile-group">
                                        <div className="creatingOrder-tile-line-heading">
                                            <h4>Asset type:</h4>
                                        </div>
                                        <p>{asset.assetType}</p>
                                    </div>
                                    {asset.assetType === 'Property' && (
                                        <>
                                            <div className="creatingOrder-tile-group">
                                                <div className="creatingOrder-tile-line-heading">
                                                    <h4>Address:</h4>
                                                </div>
                                                <p>{asset.propertyAddress}</p>
                                            </div>
                                        </>
                                    )}
                                    {asset.assetType === 'Bank Account' && (
                                        <>
                                            <div className="creatingOrder-tile-group">
                                                <div className="creatingOrder-tile-line-heading">
                                                    <h4>Bank Name:</h4>
                                                </div>
                                                <p>{asset.bankName}</p>
                                            </div>
                                        </>
                                    )}
                                    {asset.assetType === 'Stocks and shares' && (
                                        <>
                                            <div className="creatingOrder-tile-group">
                                                <div className="creatingOrder-tile-line-heading">
                                                    <h4>Company Name:</h4>
                                                </div>
                                                <p>{asset.companyName}</p>
                                            </div>
                                        </>
                                    )}
                                    {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') && (
                                        <>
                                            <div className="creatingOrder-tile-group">
                                                <div className="creatingOrder-tile-line-heading">
                                                    <h4>Provider:</h4>
                                                </div>
                                                <p>{asset.provider}</p>
                                            </div>
                                        </>
                                    )}
                                    {asset.assetType === 'Other' && (
                                        <>
                                            <div className="creatingOrder-tile-group">
                                                <div className="creatingOrder-tile-line-heading">
                                                    <h4>Details:</h4>
                                                </div>
                                                <p>{asset.otherAssetDetails}</p>
                                            </div>
                                        </>
                                    )}







                                </div>
                            ))}

                    <div className="creatingOrder-tile-btn-container">
                        <button className="creatingOrder-tile-btn" onClick={() => navigate('/assets')}>Edit</button>
                    </div>
                </>
                ) : (
                <>
                    <p>Tell us about your assets...</p>
                    <div className="creatingOrder-tile-btn-container">
                        <button className="creatingOrder-tile-btn" onClick={() => navigate('/assets')}>Get Started</button>
                    </div>
                </>
                    )}
            </div>
        </section >
        </>
    );
}

export default AssetsTile;
